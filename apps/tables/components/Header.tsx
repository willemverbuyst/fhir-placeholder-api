"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/patient", label: "Patient" },
  { href: "/episode", label: "Episode" },
  { href: "/condition", label: "Condition" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex gap-4 pb-4 sm:items-start">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`text-base ${
              isActive
                ? "font-semibold text-zinc-300"
                : "text-blue-600 hover:underline"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </header>
  );
}
