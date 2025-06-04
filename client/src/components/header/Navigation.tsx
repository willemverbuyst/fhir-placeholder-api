import { useState } from "react";
import { NavLink } from "react-router";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

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
        <section className="absolute top-[48px] left-0 w-full peer-open:flex hidden bg-white justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col bg-white w-full items-center">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/">CapabilityStatement</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/graph">Graph</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/search-sort-filter">Search Sort Filter</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/crate">Create</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </section>
      </div>
      <section className="md:flex hidden items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/">CapabilityStatement</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/graph">Graph</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/search-sort-filter">Search Sort Filter</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/create">Create</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </>
  );
}
