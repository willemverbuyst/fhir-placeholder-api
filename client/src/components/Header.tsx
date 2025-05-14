import { NavLink } from "react-router";

export function Header() {
  return (
    <section className="flex flex-col items-center my-6">
      <h1 className="text-3xl">Fhir Placeholder Api</h1>
      <nav className="flex gap-4 p-3">
        <NavLink
          to="/"
          className="aria-[current=page]:text-blue-500 hover:underline"
        >
          Capability Statement
        </NavLink>
        <NavLink
          to="/graph"
          className="aria-[current=page]:text-blue-500 hover:underline"
        >
          Graph
        </NavLink>
        <NavLink
          to="/search-sort-filter"
          className="aria-[current=page]:text-blue-500 hover:underline"
        >
          Search Sort Filter
        </NavLink>
        <NavLink
          to="/create"
          className="aria-[current=page]:text-blue-500 hover:underline"
        >
          Create
        </NavLink>
      </nav>
    </section>
  );
}
