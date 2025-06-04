import { LightDarkModeToggle } from "./LightDarkModeToggle";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="w-full z-10 sticky flex flex-col top-0 px-4 pb-4">
      <section className="flex justify-between">
        <h1 className="text-3xl p-2">Fhir Placeholder Api</h1>
        <LightDarkModeToggle />
      </section>
      <Navigation />
    </header>
  );
}
