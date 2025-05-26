import { useState } from "react";
import { NavLink } from "react-router";
import { cn } from "../lib/utils";

function MenuItem({ text, path }: { text: string; path: string }) {
  return (
    <NavLink
      to={path}
      className="flex h-full items-center p-4 text-zinc-200 font-bold aria-[current=page]:text-blue-300 hover:text-white hover:bg-white/10 transition-colors ease-in-out"
    >
      {text}
    </NavLink>
  );
}

function MobileMenuItem({ text, path }: { text: string; path: string }) {
  return (
    <NavLink
      to={path}
      className="relative flex h-full justify-center items-center p-4 text-zinc-200 font-bold aria-[current=page]:text-blue-300 hover:text-white hover:bg-white/10 transition-colors ease-in-out"
    >
      {text}
    </NavLink>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="w-full z-10 sticky flex items-center top-0 bg-gradient-to-r from-gray-900 to-gray-700 text-zinc-200 px-4">
      <h1 className="text-3xl p-2">Fhir Placeholder Api</h1>
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
          <div className="bg-zinc-200 rounded-full w-8 h-1 group-open:rotate-45 transition-all top 0 group-open:top-2 relative" />
          <div className="bg-zinc-200 rounded-full w-8 h-1 mt-1 opacity-100 group-open:opacity-0 transition-all" />
          <div className="bg-zinc-200 rounded-full w-8 h-1 mt-1 group-open:-rotate-45 transition-all top-0 group-open:-top-2 relative" />
        </button>
        <nav className="absolute top-[48px] left-0 bg-gradient-to-r from-gray-900 to-gray-700 w-full peer-open:block hidden">
          <MobileMenuItem text="Home" path="/" />
          <MobileMenuItem text="Graph" path="/graph" />
          <MobileMenuItem
            text="Search Sort Filter"
            path="/search-sort-filter"
          />
          <MobileMenuItem text="Create" path="/create" />
        </nav>
      </div>
      <nav className="flex-1 md:flex hidden items-center justify-end">
        <MenuItem text="Home" path="/" />
        <MenuItem text="Graph" path="/graph" />
        <MenuItem text="Search Sort Filter" path="/search-sort-filter" />
        <MenuItem text="Create" path="/create" />
      </nav>
    </header>
  );
}
