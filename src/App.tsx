import { Organization, Patient } from "fhir/r5";
import React, { useState } from "react";
import { OrganizationRenderer } from "./components/Renderers/OrganizationRenderer";
import { PatientRenderer } from "./components/Renderers/PatientRenderer";
import { SearchSortAndFilter } from "./components/SearchSortAndFilter";
import { Items } from "./constants";
import { organizations } from "./dummyData/organization";
import { patients } from "./dummyData/patient";
import { cn } from "./lib/utils";

function App(): React.JSX.Element {
  const [display, setDisplay] = useState<keyof typeof Items>(Items.PATIENTS);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Filter, Search & Sort</h1>
        <em className="text-gray-700 py-2">fhir-placeholder-api</em>
      </header>

      <main className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          <button
            className={cn(
              "py-2 px-4 rounded-md",
              display === Items.PATIENTS && "bg-teal-500 text-white",
            )}
            onClick={() => setDisplay(Items.PATIENTS)}
          >
            {Items.PATIENTS}
          </button>
          <button
            className={cn(
              "border-2 py-2 px-4 rounded-md",
              display === Items.ORGANIZATION && "bg-amber-800 text-white",
            )}
            onClick={() => setDisplay(Items.ORGANIZATION)}
          >
            {Items.ORGANIZATION}
          </button>
        </section>

        <section className="p-4 rounded-lg w-full">
          {display === Items.PATIENTS ? (
            <SearchSortAndFilter<Patient & { id: string }>
              dataSource={patients}
              searchProperties={["gender"]}
              filterKeys={["active"]}
              sortKeys={["gender", "birthDate", "id"]}
              initialSortProperty={{
                property: "id",
                isDescending: true,
              }}
              initialFilterProperties={[]}
              initialSearchQuery=""
            >
              {(patient): React.JSX.Element => (
                <PatientRenderer {...patient} key={patient.id} />
              )}
            </SearchSortAndFilter>
          ) : display === Items.ORGANIZATION ? (
            <SearchSortAndFilter<Organization & { id: string }>
              dataSource={organizations}
              searchProperties={["name"]}
              filterKeys={["active"]}
              sortKeys={["name", "id"]}
              initialSortProperty={{
                property: "id",
                isDescending: true,
              }}
              initialFilterProperties={[]}
              initialSearchQuery=""
            >
              {(organization): React.JSX.Element => (
                <OrganizationRenderer {...organization} key={organization.id} />
              )}
            </SearchSortAndFilter>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
