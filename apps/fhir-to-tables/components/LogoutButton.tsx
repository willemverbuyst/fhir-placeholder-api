"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/");
  }

  return (
    <Button type="button" onClick={() => void handleLogout()}>
      Log out
    </Button>
  );
}
