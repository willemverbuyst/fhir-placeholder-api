import { NavLink } from "react-router";

export function Header() {
  return (
    <nav className="flex gap-4 p-3">
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/graph"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Graph
      </NavLink>
      <NavLink
        to="/search-sort-filter"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Search Sort Filter
      </NavLink>
      <NavLink
        to="/create"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Create
      </NavLink>
    </nav>
  );
}
