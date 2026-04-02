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
    const me = await fetchMe();
    if (me?.role === "admin") {
      router.replace("/tables?resource-type=Organization");
      return;
    }

    if (me) {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
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
        credentials: "include",
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
        !("ok" in loginJson) ||
        (loginJson as { ok: unknown }).ok !== true
      ) {
        setError("Invalid login response.");
        return;
      }

      const me = await fetchMe();
      if (!me || me.role !== "admin") {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        setError("Admin access required.");
        return;
      }

      router.replace("/tables?resource-type=Organization");
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
            className="rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-700"
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
            className="rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-700"
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
