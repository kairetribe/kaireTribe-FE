"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { finalizeGoogleAuth } from "@/service/auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import type { SignUpForm } from "@/lib/types/auth";

function readSignupProfile(): Partial<SignUpForm> | undefined {
  try {
    const raw = sessionStorage.getItem("signup_profile");
    if (!raw) return undefined;
    return JSON.parse(raw) as Partial<SignUpForm>;
  } catch {
    return undefined;
  }
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveSession } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const flow = useMemo(() => searchParams.get("flow"), [searchParams]);

  useEffect(() => {
    let active = true;

    const run = async (): Promise<void> => {
      const nextPath = searchParams.get("next") || "/user";
      const profile = flow === "signup" ? readSignupProfile() : undefined;
      const { session, error: authError } = await finalizeGoogleAuth(profile);

      if (!active) return;

      if (authError || !session) {
        setError(authError ?? "Unable to complete authentication.");
        return;
      }

      sessionStorage.removeItem("signup_profile");
      saveSession(session);
      router.replace(session.role === "admin" ? "/admin" : nextPath);
    };

    void run();

    return () => {
      active = false;
    };
  }, [flow, router, saveSession, searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Finalizing account...</h1>
        {error ? (
          <>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button
              onClick={() => router.replace("/sign-in")}
              className="px-4 py-2 rounded-md bg-[#1C2FBB] text-white text-sm font-medium"
            >
              Back to sign in
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500">Please wait while we finish signing you in.</p>
        )}
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-4">
          <p className="text-sm text-gray-500">Preparing authentication...</p>
        </main>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
