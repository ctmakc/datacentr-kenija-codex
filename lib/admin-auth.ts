import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "admin_session";

export function getAdminTokenConfigured() {
  return process.env.ADMIN_TOKEN && process.env.ADMIN_TOKEN.trim().length > 0;
}

export function isAdminAuthenticated() {
  const configuredToken = process.env.ADMIN_TOKEN ?? "";
  if (!configuredToken) {
    return false;
  }
  const session = cookies().get(ADMIN_COOKIE)?.value ?? "";
  return session === configuredToken;
}

export function requireAdminAuth(locale: string) {
  if (!isAdminAuthenticated()) {
    redirect(`/${locale}/portal/admin/login`);
  }
}

export function setAdminSession(token: string) {
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}

export function clearAdminSession() {
  cookies().set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
}
