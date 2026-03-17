import { LightDarkModeToggle } from "./LightDarkModeToggle";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="grid grid-cols-3 sticky top-0 p-5 h-18 items-center">
      <div className="justify-self-start">
        <span className="text-3xl font-bold">Fhir Placeholder Api</span>
      </div>
      <div className="justify-self-center">
        <Navigation />
      </div>
      <div className="justify-self-end">
        <LightDarkModeToggle />
      </div>
    </header>
  );
}
