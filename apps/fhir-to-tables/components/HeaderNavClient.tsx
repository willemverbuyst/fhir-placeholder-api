"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { NavLink } from "./Header";

type HeaderNavClientProps = {
  links: NavLink[];
};

export default function HeaderNavClient({ links }: HeaderNavClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedResourceType = searchParams.get("resource-type");

  return (
    <nav className="flex w-full max-w-[1200px] flex-wrap justify-center gap-x-4 gap-y-2">
      {links.map(({ href, label }) => {
        const isActive =
          pathname === "/tables" && selectedResourceType === label;

        return (
          <Link
            key={href}
            href={href}
            className={`text-base ${
              isActive
                ? "font-semibold text-primary"
                : "text-muted-foreground hover:underline"
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
