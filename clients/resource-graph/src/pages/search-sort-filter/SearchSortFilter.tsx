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
import { useState } from "react";
import { CardsRenderer } from "./CardsRenderer.tsx";
import { SelectResourceButton } from "./SelectResourceButton";
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

export function SearchSortFilter() {
  const [display, setDisplay] = useState<keyof ConfigItems>("Organization");

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <div className="flex flex-col items-center">
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
      </div>
    </div>
  );
}
