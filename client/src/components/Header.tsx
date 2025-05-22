import { NavLink } from "react-router";

function MenuItem({ text, path }: { text: string; path: string }) {
  return (
    <NavLink
      to={path}
      className="flex h-full items-center p-4 aria-[current=page]:text-white hover:text-white hover:bg-white/10 transition-colors ease-in-out"
    >
      {text}
    </NavLink>
  );
}

export function Header() {
  return (
    <header className="w-full sticky flex items-center top-0 bg-gradient-to-r from-gray-900 to-gray-700 text-zinc-200 px-4">
      <h1 className="text-3xl p-2">Fhir Placeholder Api</h1>
      <nav className="flex-1 flex items-center justify-end text-zinc-200">
        <MenuItem text="Home" path="/" />
        <MenuItem text="Graph" path="/graph" />
        <MenuItem text="Search Sort Filter" path="/search-sort-filter" />
        <MenuItem text="Create" path="/create" />
      </nav>
    </header>
  );
}
