import { useState } from "react";
import { type ConfigItems, FHIR_RESOURCES } from "../../config/fhirResources";
import { SelectResourceButton } from "../search-sort-filter/SelectResourceButton";
import { CreateOrganization } from "./CreateOrganization";

const ItemMap = {
  Appointment: <p>Not implemented yet</p>,
  Condition: <p>Not implemented yet</p>,
  EpisodeOfCare: <p>Not implemented yet</p>,
  Organization: <CreateOrganization />,
  PractitionerRole: <p>Not implemented yet</p>,
  Practitioner: <p>Not implemented yet</p>,

  Patient: <p>Not implemented yet</p>,
  Encounter: <p>Not implemented yet</p>,
  Observation: <p>Not implemented yet</p>,
};

export function Create() {
  const [display, setDisplay] = useState<keyof ConfigItems>("Organization");

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center p-10">
      <div className="flex flex-col items-center">
        <section className="flex gap-2 py-4">
          {Object.keys(FHIR_RESOURCES).map((k) => (
            <SelectResourceButton
              key={k}
              setDisplay={setDisplay}
              className={
                FHIR_RESOURCES[k as keyof typeof FHIR_RESOURCES].bgColor
              }
              caption={k as keyof typeof FHIR_RESOURCES}
            />
          ))}
        </section>

        <section className="p-4 rounded-lg w-full">{ItemMap[display]}</section>
      </div>
    </div>
  );
}
