import { NavLink } from "react-router";

export function Header() {
  return (
    <nav className="flex gap-2 p-3">
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
        to="/cards"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Cards
      </NavLink>
    </nav>
  );
}
