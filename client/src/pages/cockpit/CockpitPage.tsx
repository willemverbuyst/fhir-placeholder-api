import { Button } from "@/components/ui/button";
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
import { APP_RESOURCE_TYPES, FHIR_RESOURCES } from "../../config/fhirResources";
import { cn, hasKey } from "../../lib/utils";
import { CardsRenderer } from "./CardsRenderer";
import { useFormStore } from "./useFormStore";

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

export function CockpitPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resource = searchParams.get("resource");
  const { setResourceForm } = useFormStore();

  useEffect(() => {
    if (!resource) {
      setSearchParams({ resource: "Patient" });
    }
  }, [resource, setSearchParams]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {APP_RESOURCE_TYPES.map((k) => (
          <Button
            key={k}
            type="button"
            onClick={() => {
              setSearchParams({ resource: k });
              setResourceForm(null);
            }}
            variant="ghost"
            className={cn(
              resource === k && " rounded-none border-b-2 border-primary",
            )}
          >
            {k}
          </Button>
        ))}
      </div>

      {resource && hasKey(ItemMap, resource) && <div>{ItemMap[resource]}</div>}
    </div>
  );
}
