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
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { SelectResourceButton } from "../../components/SelectResourceButton";
import { APP_RESOURCE_TYPES, FHIR_RESOURCES } from "../../config/fhirResources";
import { CardsRenderer } from "./CardsRenderer";

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

export function SearchSortFilterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const display = searchParams.get("resource");

  useEffect(() => {
    if (!display) {
      setSearchParams({ resource: "Patient" });
    }
  }, [display, setSearchParams]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {APP_RESOURCE_TYPES.map((k) => (
          <SelectResourceButton key={k} caption={k} />
        ))}
      </div>

      <div>{ItemMap[display as keyof typeof ItemMap]}</div>
    </div>
  );
}
