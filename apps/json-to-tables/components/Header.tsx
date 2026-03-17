"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/allergy-intolerance", label: "AllergyIntolerance" },
  { href: "/appointment", label: "Appointment" },
  { href: "/condition", label: "Condition" },
  { href: "/encounter", label: "Encounter" },
  { href: "/episode-of-care", label: "EpisodeOfCare" },
  { href: "/observation", label: "Observation" },
  { href: "/organization", label: "Organization" },
  { href: "/patient", label: "Patient" },
  { href: "/practitioner", label: "Practitioner" },
  { href: "/practitioner-role", label: "PractitionerRole" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex w-full justify-center gap-4 pb-4 sm:items-start">
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
