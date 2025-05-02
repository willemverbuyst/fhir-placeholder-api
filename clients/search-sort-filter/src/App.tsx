import type {
  Condition,
  Encounter,
  EpisodeOfCare,
  Observation,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
} from "fhir/r5";
import type React from "react";
import { useState } from "react";
import { CardsRenderer } from "./components/CardsRenderer.tsx";
import { SelectResourceButton } from "./components/SelectResourceButton";
import { CONFIG_ITEMS, type ConfigItems } from "./constants.tsx";

const ItemMap = {
  Condition: <CardsRenderer<Condition> item={CONFIG_ITEMS.Condition} />,
  EpisodeOfCare: (
    <CardsRenderer<EpisodeOfCare> item={CONFIG_ITEMS.EpisodeOfCare} />
  ),
  Organization: (
    <CardsRenderer<Organization> item={CONFIG_ITEMS.Organization} />
  ),
  PractitionerRole: (
    <CardsRenderer<PractitionerRole> item={CONFIG_ITEMS.PractitionerRole} />
  ),
  Practitioner: (
    <CardsRenderer<Practitioner> item={CONFIG_ITEMS.Practitioner} />
  ),
  Patient: <CardsRenderer<Patient> item={CONFIG_ITEMS.Patient} />,
  Encounter: <CardsRenderer<Encounter> item={CONFIG_ITEMS.Encounter} />,
  Observation: <CardsRenderer<Observation> item={CONFIG_ITEMS.Observation} />,
};

function App(): React.JSX.Element {
  const [display, setDisplay] = useState<keyof ConfigItems>("Organization");

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Filter, Search & Sort</h1>
        <em className="text-gray-700 py-2">fhir-placeholder-api</em>
      </header>

      <main className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          {Object.keys(CONFIG_ITEMS).map((k) => (
            <SelectResourceButton
              key={k}
              setDisplay={setDisplay}
              className={CONFIG_ITEMS[k as keyof typeof CONFIG_ITEMS].bgColor}
              caption={k as keyof typeof CONFIG_ITEMS}
            />
          ))}
        </section>

        <section className="p-4 rounded-lg w-full">{ItemMap[display]}</section>
      </main>
    </div>
  );
}

export default App;
