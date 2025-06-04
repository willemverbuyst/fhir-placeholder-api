import { LightDarkModeToggle } from "./LightDarkModeToggle";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="w-full z-10 sticky flex items-center gap-10 top-0 px-4 bg-background">
      <h1 className="text-3xl p-2">Fhir Placeholder Api</h1>
      <Navigation />
      <LightDarkModeToggle />
    </header>
  );
}
