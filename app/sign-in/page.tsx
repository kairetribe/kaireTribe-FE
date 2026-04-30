"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { signInWithEmail, signInWithGoogle } from "@/service/auth";
import { useAuthContext } from "@/hooks/useAuthContext";

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className="text-[#1C2FBB]"
    >
      {visible ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className="text-[#1C2FBB]"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const { saveSession } = useAuthContext();

  const [email, setEmail]               = useState<string>("");
  const [password, setPassword]         = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe]     = useState<boolean>(false);
  const [focused, setFocused]           = useState<string | null>(null);
  const [error, setError]               = useState<string | null>(null);
  const [isLoading, setIsLoading]       = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email.trim())    { setError("Please enter your email address."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }

    setError(null);
    setIsLoading(true);

    const { session, error: authError } = await signInWithEmail(email, password);

    setIsLoading(false);

    if (authError || !session) {
      setError(authError ?? "Sign in failed. Please try again.");
      return;
    }

    // Write session to cookie — middleware will read this on next request
    saveSession(session);

    // Navigate to the correct dashboard based on role
    router.push(session.role === "admin" ? "/admin" : "/user");
  };

  const handleGoogleLogin = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);

    const { error: authError } = await signInWithGoogle(
      `${window.location.origin}/auth/callback?next=/user&flow=signin`
    );

    if (authError) {
      setError(authError);
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3.5 py-3 pr-11 border rounded-lg text-sm text-gray-700 bg-white outline-none transition-colors duration-200 ${
      focused === field ? "border-[#1C2FBB]" : "border-gray-200"
    }`;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">

      {/* ── Left image panel ── */}
      <div className="w-1/2 shrink-0 hidden md:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&fit=crop&q=80"
          alt="KaireTribe student"
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center md:px-16 px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-sm">

          <Logo />

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1.5 tracking-tight">
            Log In
          </h1>
          <p className="text-sm text-gray-500 text-center mb-7">
            Enter your credentials to access your account
          </p>

          {/* Error banner */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={inputClass("email")}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <MailIcon />
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                className={inputClass("password")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#1C2FBB] cursor-pointer"
              />
              <span className="text-sm text-gray-700 font-medium">
                Remember me for 30 days
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[#1C2FBB] font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3.5 bg-[#1C2FBB] text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-70 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? "Logging in..." : "Log into Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-lg bg-white text-gray-900 font-semibold text-sm hover:shadow-md transition-shadow duration-200 mb-6"
          >
            <svg width="19" height="19" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-gray-400">
            Are you new here?{" "}
            <Link href="/sign-up" className="text-[#1C2FBB] font-semibold hover:underline">
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}