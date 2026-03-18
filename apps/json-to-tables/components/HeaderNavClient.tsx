"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "./Header";

type HeaderNavClientProps = {
  links: NavLink[];
};

export default function HeaderNavClient({ links }: HeaderNavClientProps) {
  const pathname = usePathname();

  return (
    <nav className="flex w-full max-w-[1200px] flex-wrap justify-center gap-x-4 gap-y-2">
      {links.map(({ href, label }) => {
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
    </nav>
  );
}
