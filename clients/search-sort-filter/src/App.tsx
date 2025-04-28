import type React from "react";
import { useState } from "react";
import { SelectResourceButton } from "./components/SelectResourceButton";
import { OrganizationSearchSortAndFilter } from "./components/cards/organization.card";
import { PatientSearchSortAndFilter } from "./components/cards/patient.card";
import { RESOURCES, type ResourceType } from "./constants";

function App(): React.JSX.Element {
  const [display, setDisplay] = useState<ResourceType>(
    RESOURCES[0].resourceType,
  );

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Filter, Search & Sort</h1>
        <em className="text-gray-700 py-2">fhir-placeholder-api</em>
      </header>

      <main className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          {RESOURCES.map((r) => (
            <SelectResourceButton
              key={r.resourceType}
              setDisplay={setDisplay}
              className={r.color}
              caption={r.resourceType}
            />
          ))}
        </section>

        <section className="p-4 rounded-lg w-full">
          {display === "PATIENT" ? (
            <PatientSearchSortAndFilter />
          ) : display === "ORGANIZATION" ? (
            <OrganizationSearchSortAndFilter />
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
