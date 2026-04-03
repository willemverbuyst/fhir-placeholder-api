"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      router.replace("/capability-statement");
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

      router.replace("/capability-statement");
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
        className="flex flex-col gap-4 rounded-lg border bg-muted p-6"
      >
        <Label>Username</Label>
        <Input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
