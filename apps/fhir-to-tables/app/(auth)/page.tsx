"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { fetchMe } from "@/lib/me-client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const redirectIfAdmin = useCallback(async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    if (!token) {
      setCheckingSession(false);
      return;
    }

    const me = await fetchMe(token);
    if (me?.role === "admin") {
      router.replace("/Organization");
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
    setCheckingSession(false);
  }, [router]);

  useEffect(() => {
    void redirectIfAdmin();
  }, [redirectIfAdmin]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        setError("Login failed.");
        return;
      }

      const loginJson: unknown = await loginResponse.json();
      if (
        typeof loginJson !== "object" ||
        loginJson === null ||
        !("token" in loginJson) ||
        typeof (loginJson as { token: unknown }).token !== "string"
      ) {
        setError("Invalid login response.");
        return;
      }

      const token = (loginJson as { token: string }).token;
      window.localStorage.setItem("token", token);

      const me = await fetchMe(token);
      if (!me || me.role !== "admin") {
        window.localStorage.removeItem("token");
        setError("Admin access required.");
        return;
      }

      router.replace("/Organization");
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingSession) {
    return <LoadingOverlay mode="full" label="Loading…" />;
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <h1 className="text-center text-2xl font-semibold">Sign in</h1>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-zinc-700">Username</span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-base"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-zinc-700">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-base"
            required
          />
        </label>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
