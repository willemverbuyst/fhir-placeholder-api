import React, { useState } from "react";
import { OrganizationSearchSortAndFilter } from "./components/Organization/OrganizationSearchSortAndFilter";
import { PatientSearchSortAndFilter } from "./components/Patient/PatientSearchSortAndFilter";
import { SelectResourceButton } from "./components/SelectResourceButton";
import { Items } from "./constants";

function App(): React.JSX.Element {
  const [display, setDisplay] = useState<keyof typeof Items>(
    Items.ORGANIZATION,
  );

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Filter, Search & Sort</h1>
        <em className="text-gray-700 py-2">fhir-placeholder-api</em>
      </header>

      <main className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          <SelectResourceButton
            setDisplay={setDisplay}
            className="bg-amber-800"
            caption={Items.ORGANIZATION}
          />
          <SelectResourceButton
            setDisplay={setDisplay}
            className="bg-teal-500"
            caption={Items.PATIENT}
          />
        </section>

        <section className="p-4 rounded-lg w-full">
          {display === Items.PATIENT ? (
            <PatientSearchSortAndFilter />
          ) : display === Items.ORGANIZATION ? (
            <OrganizationSearchSortAndFilter />
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
