import { spawn } from "node:child_process";

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const port = process.env.VERIFY_PORT || "3100";
const baseUrl = `http://localhost:${port}`;

function run(command, args, options = {}) {
  const { timeoutMs = 0, ...spawnOptions } = options;
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...spawnOptions
    });
    let timeoutId;

    if (timeoutMs > 0) {
      timeoutId = setTimeout(() => {
        if (process.platform === "win32" && child.pid) {
          spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore", shell: true });
        } else {
          child.kill("SIGTERM");
        }
        reject(new Error(`${command} ${args.join(" ")} timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    }

    child.on("exit", (code) => {
      if (timeoutId) clearTimeout(timeoutId);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });

    child.on("error", reject);
  });
}

async function waitForServer(url, timeoutMs = 60000) {
  const started = Date.now();
  let attempt = 0;
  while (Date.now() - started < timeoutMs) {
    attempt += 1;
    try {
      const response = await fetch(`${url}/en`, { redirect: "manual" });
      if (response.status === 200) {
        return;
      }
    } catch {
      // keep polling
    }
    if (attempt % 5 === 0) {
      console.log(`[verify] waiting for server... ${Math.round((Date.now() - started) / 1000)}s`);
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  throw new Error(`Server did not become ready at ${url} within ${timeoutMs}ms`);
}

async function freePort3100() {
  if (process.platform !== "win32") return;

  await run(
    "powershell",
    [
      "-NoProfile",
      "-Command",
      "$p=(Get-NetTCPConnection -LocalPort 3100 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess); if ($p) { taskkill /PID $p /T /F | Out-Null }"
    ],
    { stdio: "ignore" }
  ).catch(() => {
    // no-op
  });
}

async function main() {
  console.log("[verify] Building project...");
  await run(npmCmd, ["run", "build"], { timeoutMs: 12 * 60 * 1000 });

  await freePort3100();

  console.log("[verify] Starting production server...");
  const server = spawn(npmCmd, ["run", "start", "--", "-p", port], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, NODE_ENV: "production" }
  });

  const stopServer = async () => {
    if (process.platform === "win32" && server.pid) {
      await run("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
        stdio: "ignore"
      }).catch(() => {
        // no-op
      });
      return;
    }

    if (!server.killed) {
      server.kill("SIGTERM");
    }
  };

  process.on("SIGINT", async () => {
    await stopServer();
    process.exit(130);
  });
  process.on("SIGTERM", async () => {
    await stopServer();
    process.exit(143);
  });

  try {
    await waitForServer(baseUrl);
    console.log(`[verify] Running smoke checks against ${baseUrl}...`);
    await run("node", ["scripts/smoke-test.mjs"], {
      env: { ...process.env, BASE_URL: baseUrl },
      timeoutMs: 3 * 60 * 1000
    });
    console.log("[verify] Success");
  } finally {
    await stopServer();
  }
}

main().catch((error) => {
  console.error("[verify] Failed:", error.message);
  process.exit(1);
});
