"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { fetchMe } from "@/lib/me-client";

export default function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")
          : null;

      if (!token) {
        router.replace("/");
        return;
      }

      const me = await fetchMe(token);
      if (cancelled) {
        return;
      }

      if (!me || me.role !== "admin") {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("token");
        }
        router.replace("/");
        return;
      }

      setReady(true);
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return <LoadingOverlay mode="full" label="Checking session…" />;
  }

  return <>{children}</>;
}
