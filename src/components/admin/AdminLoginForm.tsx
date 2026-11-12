"use client";

import { adminLogin } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm({ initialError = "" }: { initialError?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await adminLogin(email, password, rememberMe);
      setSuccess("Signed in. Redirecting to the dashboard…");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-[10px] uppercase tracking-[2px] text-white/60 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-yellow"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-[10px] uppercase tracking-[2px] text-white/60 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-yellow"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-brand-yellow"
        />
        <label
          htmlFor="remember-me"
          className="text-[11px] uppercase tracking-[2px] text-white/60 cursor-pointer select-none"
        >
          Remember me
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="text-sm text-green-300">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-yellow py-3 text-xs font-semibold uppercase tracking-[2px] text-brand-purple transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
