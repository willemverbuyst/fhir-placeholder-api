import type {
  Appointment,
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
import {
  APP_RESOURCE_TYPES,
  type AppResourceType,
  FHIR_RESOURCES,
} from "../../config/fhirResources.ts";
import { CardsRenderer } from "./CardsRenderer.tsx";
import { SelectResourceButton } from "./SelectResourceButton.tsx";

const ItemMap = {
  Appointment: <CardsRenderer<Appointment> item={FHIR_RESOURCES.Appointment} />,
  Condition: <CardsRenderer<Condition> item={FHIR_RESOURCES.Condition} />,
  EpisodeOfCare: (
    <CardsRenderer<EpisodeOfCare> item={FHIR_RESOURCES.EpisodeOfCare} />
  ),
  Organization: (
    <CardsRenderer<Organization> item={FHIR_RESOURCES.Organization} />
  ),
  PractitionerRole: (
    <CardsRenderer<PractitionerRole> item={FHIR_RESOURCES.PractitionerRole} />
  ),
  Practitioner: (
    <CardsRenderer<Practitioner> item={FHIR_RESOURCES.Practitioner} />
  ),
  Patient: <CardsRenderer<Patient> item={FHIR_RESOURCES.Patient} />,
  Encounter: <CardsRenderer<Encounter> item={FHIR_RESOURCES.Encounter} />,
  Observation: <CardsRenderer<Observation> item={FHIR_RESOURCES.Observation} />,
};

export function SearchSortFilter() {
  const [display, setDisplay] = useState<AppResourceType>("Organization");

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <div className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          {APP_RESOURCE_TYPES.map((k) => (
            <SelectResourceButton
              key={k}
              setDisplay={setDisplay}
              className={FHIR_RESOURCES[k].bgColor}
              caption={k}
            />
          ))}
        </section>

        <section className="p-4 rounded-lg w-full">{ItemMap[display]}</section>
      </div>
    </div>
  );
}
