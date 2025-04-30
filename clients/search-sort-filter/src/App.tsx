import type React from "react";
import { useState } from "react";
import { SelectResourceButton } from "./components/SelectResourceButton";
import { OrganizationCards } from "./components/cards/organization.cards";
import { PatientCards } from "./components/cards/patient.cards";
import { CONFIG_ITEMS, type ResourceType } from "./constants";

function App(): React.JSX.Element {
  const [display, setDisplay] = useState<ResourceType>(
    CONFIG_ITEMS[0].resourceType,
  );

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Filter, Search & Sort</h1>
        <em className="text-gray-700 py-2">fhir-placeholder-api</em>
      </header>

      <main className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          {CONFIG_ITEMS.map((r) => (
            <SelectResourceButton
              key={r.resourceType}
              setDisplay={setDisplay}
              className={r.bgColor}
              caption={r.resourceType}
            />
          ))}
        </section>

        <section className="p-4 rounded-lg w-full">
          {display === "Patient" ? (
            <PatientCards {...CONFIG_ITEMS[1]} />
          ) : display === "Organization" ? (
            <OrganizationCards {...CONFIG_ITEMS[0]} />
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
