import LogoutButton from "../LogoutButton";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="bg-background grid grid-cols-3 sticky top-0 h-16 items-center">
      <div className="justify-self-start">
        <span className="text-3xl font-bold">Fhir Placeholder Api</span>
      </div>
      <div className="justify-self-center">
        <Navigation />
      </div>
      <div className="justify-self-end">
        <LogoutButton />
      </div>
    </header>
  );
}
