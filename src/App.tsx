import { Patient } from "fhir/r5";
import React, { useState } from "react";
import { PatientRenderer } from "./components/Renderers/PatientRendere";
import { PeopleRenderer } from "./components/Renderers/PeopleRenderer";
import { SearchSortAndFilter } from "./components/SearchSortAndFilter";
import { Items } from "./constants";
import { patients } from "./dummyData/patient";
import { persons } from "./dummyData/persons";
import { Person } from "./interfaces/Person";
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
              "border-primary",
              display === Items.PATIENTS && "bg-primary text-white",
            )}
            onClick={() => setDisplay(Items.PATIENTS)}
          >
            {Items.PATIENTS}
          </button>

          <button
            className={cn(
              "border-primary",
              display === Items.PEOPLE && "bg-primary text-white",
            )}
            onClick={() => setDisplay(Items.PEOPLE)}
          >
            {Items.PEOPLE}
          </button>
        </section>

        <section className="p-4 rounded-lg w-full">
          {display === Items.PATIENTS ? (
            <SearchSortAndFilter<Patient & { id: string }>
              dataSource={patients}
              searchProperties={["gender"]}
              filterKeys={["active"]}
              sortKeys={["gender", "birthDate"]}
              initialSortProperty={{
                property: "birthDate",
                isDescending: true,
              }}
              initialFilterProperties={[]}
              initialSearchQuery=""
            >
              {(patient): React.JSX.Element => (
                <PatientRenderer {...patient} key={patient.id} />
              )}
            </SearchSortAndFilter>
          ) : (
            <SearchSortAndFilter<Person>
              dataSource={persons}
              searchProperties={["firstName", "surname"]}
              filterKeys={["married", "eyeColor", "age"]}
              sortKeys={["firstName", "surname", "age"]}
              initialSortProperty={{ property: "_id", isDescending: true }}
              initialFilterProperties={[]}
              initialSearchQuery=""
            >
              {(person): React.JSX.Element => (
                <PeopleRenderer {...person} key={person._id} />
              )}
            </SearchSortAndFilter>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
