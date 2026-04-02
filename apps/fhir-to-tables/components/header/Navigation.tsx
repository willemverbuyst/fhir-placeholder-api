"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

function NavigationItems() {
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/capabilityStatement">CapabilityStatement</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/dendrogram">Dendrogram</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/cockpit">Cockpit</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/dashboard">Dashboard</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/tables">Tables</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="block md:hidden ml-auto my-auto cursor-pointer">
        <button
          type="button"
          id="mobile-menu-button"
          className={cn("group peer", mobileMenuOpen && "open")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setMobileMenuOpen(!mobileMenuOpen);
            }
          }}
        >
          <div className="bg-black rounded-full w-8 h-1 group-open:rotate-45 transition-all top 0 group-open:top-2 relative" />
          <div className="bg-black rounded-full w-8 h-1 mt-1 opacity-100 group-open:opacity-0 transition-all" />
          <div className="bg-black rounded-full w-8 h-1 mt-1 group-open:-rotate-45 transition-all top-0 group-open:-top-2 relative" />
        </button>
        <section className="absolute top-12 left-0 w-full peer-open:flex hidden bg-white justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col bg-white w-full items-center">
              <NavigationItems />
            </NavigationMenuList>
          </NavigationMenu>
        </section>
      </div>
      <section className="md:flex hidden items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationItems />
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </>
  );
}
