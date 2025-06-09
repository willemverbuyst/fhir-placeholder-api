import { InfoMessage } from "@/components/message/InfoMessage";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { APP_RESOURCE_TYPES } from "../../config/fhirResources";
import { cn, hasKey } from "../../lib/utils";
import CreateAppointmentForm from "./CreateAppointmentForm";
import CreateOrganizationForm from "./CreateOrganizationForm";

const ItemMap = {
  Appointment: <CreateAppointmentForm />,
  Condition: <InfoMessage message="not implemented yet" />,
  EpisodeOfCare: <InfoMessage message="not implemented yet" />,
  Organization: <CreateOrganizationForm />,
  PractitionerRole: <InfoMessage message="not implemented yet" />,
  Practitioner: <InfoMessage message="not implemented yet" />,
  Patient: <InfoMessage message="not implemented yet" />,
  Encounter: <InfoMessage message="not implemented yet" />,
  Observation: <InfoMessage message="not implemented yet" />,
};

export function CreatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resource = searchParams.get("resource");

  useEffect(() => {
    if (!resource) {
      setSearchParams({ resource: "Organization" });
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
