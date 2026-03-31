"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Role, LocalSession } from "@/lib/types/auth";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Cookie name used to persist the session across client and middleware. */
const SESSION_COOKIE = "kt_session";

/** Cookie max-age: 30 days in seconds. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

// ─── Cookie Helpers ───────────────────────────────────────────────────────────
function writeSessionCookie(session: LocalSession): void {
  document.cookie = [
    `${SESSION_COOKIE}=${encodeURIComponent(JSON.stringify(session))}`,
    `path=/`,
    `max-age=${COOKIE_MAX_AGE}`,
    `SameSite=Lax`,
  ].join("; ");
}

function deleteSessionCookie(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

function readSessionCookie(): LocalSession | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SESSION_COOKIE}=`));

  if (!match) return null;

  try {
    const raw = decodeURIComponent(match.split("=").slice(1).join("="));
    return JSON.parse(raw) as LocalSession;
  } catch {
    // Cookie exists but is malformed — treat as no session
    return null;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileComplete: boolean;
  role: Role | null;
  session: LocalSession | null;
  saveSession: (session: LocalSession) => void;
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession]     = useState<LocalSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const stored = readSessionCookie();
    setSession(stored);
    setIsLoading(false);
  }, []);

  const saveSession = useCallback((newSession: LocalSession): void => {
    writeSessionCookie(newSession);
    setSession(newSession);
  }, []);

  const logout = useCallback((): void => {
    deleteSessionCookie();
    setSession(null);
    window.location.href = "/sign-in";
  }, []);

  // ── Derived state ─────────────────────────────────────────────────────────

  const isAuthenticated = session !== null;
  const role            = session?.role ?? null;

  const isProfileComplete = isAuthenticated;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isProfileComplete,
        role,
        session,
        saveSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};