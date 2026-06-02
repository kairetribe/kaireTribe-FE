import type { NextRequest } from "next/server";
import type { LocalSession, Role } from "@/lib/types/auth";

const SESSION_COOKIE = "kt_session";

export function getSessionFromRequest(
  request: NextRequest
): LocalSession | null {
  const cookie = request.cookies.get(SESSION_COOKIE);
  if (!cookie?.value) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie.value)) as LocalSession;
  } catch {
    return null;
  }
}

export function canCreateStaff(role: Role): boolean {
  return role === "admin";
}
