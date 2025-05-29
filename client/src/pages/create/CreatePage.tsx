import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { SelectResourceButton } from "../../components/SelectResourceButton";
import { APP_RESOURCE_TYPES } from "../../config/fhirResources";
import { hasKey } from "../../lib/utils";
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

export function CreatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resource = searchParams.get("resource");

  useEffect(() => {
    if (!resource) {
      setSearchParams({ resource: "Organization" });
    }
  }, [resource, setSearchParams]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {APP_RESOURCE_TYPES.map((k) => (
          <SelectResourceButton key={k} caption={k} />
        ))}
      </div>

      {resource && hasKey(ItemMap, resource) && <div>{ItemMap[resource]}</div>}
    </div>
  );
}
