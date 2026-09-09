const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const routes = [
  "/en",
  "/ru",
  "/zh",
  "/en/project/overview",
  "/en/compute/overview",
  "/en/legal/privacy-policy",
  "/en/legal/terms-of-service",
  "/en/legal/cookie-policy",
  "/en/news/updates/phase-1-feasibility",
  "/en/portal",
  "/en/portal/admin/login",
  "/en/portal/login",
  "/en/portal/register",
  "/en/portal/customer-dashboard/overview",
  "/en/portal/customer-dashboard/services",
  "/en/portal/customer-dashboard/billing",
  "/en/portal/customer-dashboard/support",
  "/en/portal/customer-dashboard/settings",
  "/en/portal/partner-area/dashboard",
  "/en/portal/partner-area/project",
  "/en/portal/partner-area/documents",
  "/en/portal/partner-area/communication",
  "/en/portal/investor-room/dashboard",
  "/en/portal/investor-room/financials",
  "/en/portal/investor-room/documents",
  "/en/portal/investor-room/updates",
  "/en/portal/investor-room/communication"
];

const maxAttempts = 4;
const waitMs = 900;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRoute(route) {
  const url = `${baseUrl}${route}`;
  let lastError = "";

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      const body = await response.text();

      if (response.status !== 200) {
        lastError = `status ${response.status}`;
      } else if (body.includes("Server Error") || body.includes("Cannot find module './")) {
        lastError = "runtime error marker in html";
      } else {
        return { ok: true, route, status: response.status };
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    if (attempt < maxAttempts) {
      await sleep(waitMs);
    }
  }

  return { ok: false, route, error: lastError };
}

async function main() {
  console.log(`[smoke] Base URL: ${baseUrl}`);
  const results = [];

  for (const route of routes) {
    const result = await checkRoute(route);
    results.push(result);
    if (result.ok) {
      console.log(`[ok] ${route}`);
    } else {
      console.error(`[fail] ${route} -> ${result.error}`);
    }
  }

  const failed = results.filter((result) => !result.ok);
  if (failed.length > 0) {
    console.error(`[smoke] Failed routes: ${failed.length}/${routes.length}`);
    process.exit(1);
  }

  console.log(`[smoke] All routes are healthy (${routes.length}/${routes.length})`);
}

main().catch((error) => {
  console.error("[smoke] Fatal error:", error);
  process.exit(1);
});
