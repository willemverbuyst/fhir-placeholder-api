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
      const me = await fetchMe();
      if (cancelled) {
        return;
      }

      if (!me) {
        router.replace("/");
        return;
      }

      if (me.role !== "admin") {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        if (cancelled) {
          return;
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
