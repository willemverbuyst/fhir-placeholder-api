import { Patient } from "fhir/r5";
import React, { useState } from "react";
import { BookRenderer } from "./components/Renderers/BookRenderer";
import { PatientRenderer } from "./components/Renderers/PatientRendere";
import { PeopleRenderer } from "./components/Renderers/PeopleRenderer";
import { SearchSortAndFilter } from "./components/SearchSortAndFilter";
import { Button } from "./components/ui/button";
import { Items } from "./constants";
import { books } from "./dummyData/books";
import { patients } from "./dummyData/patient";
import { persons } from "./dummyData/persons";
import { Book } from "./interfaces/Book";
import { Person } from "./interfaces/Person";
import { cn } from "./lib/utils";

function App(): React.JSX.Element {
  const [display, setDisplay] = useState<keyof typeof Items>(Items.BOOKS);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10 bg-gray-200">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Filter, Search & Sort</h1>
        <em className="text-gray-700 py-2">fhir-placeholder-api</em>
      </header>

      <main className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          <Button
            variant="outline"
            className={cn(
              "border-primary",
              display === Items.PATIENTS && "bg-primary text-white",
            )}
            onClick={() => setDisplay(Items.PATIENTS)}
          >
            {Items.PATIENTS}
          </Button>
          <Button
            variant="outline"
            className={cn(
              "border-primary",
              display === Items.BOOKS && "bg-primary text-white",
            )}
            onClick={() => setDisplay(Items.BOOKS)}
          >
            {Items.BOOKS}
          </Button>
          <Button
            variant="outline"
            className={cn(
              "border-primary",
              display === Items.PEOPLE && "bg-primary text-white",
            )}
            onClick={() => setDisplay(Items.PEOPLE)}
          >
            {Items.PEOPLE}
          </Button>
        </section>

        <section className="bg-gray-300 p-4 rounded-lg w-full">
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
          ) : display === Items.BOOKS ? (
            <SearchSortAndFilter<Book>
              dataSource={books}
              searchProperties={["title", "author"]}
              filterKeys={["inPrint"]}
              sortKeys={["author", "title", "pages"]}
              initialSortProperty={{ property: "title", isDescending: true }}
              initialFilterProperties={[]}
              initialSearchQuery=""
            >
              {(book): React.JSX.Element => (
                <BookRenderer {...book} key={book._id} />
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
