import { useQuery } from "@tanstack/react-query";
import { Patient } from "fhir/r5";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";
import { Conditions } from "./condition.resource";

export function Patients({ practitionerId }: { practitionerId: string }) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Patient>({
      url: `Patient?general-practitioner=${practitionerId}`,
      queryKeys: ["patient", practitionerId],
    })
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) =>
        e.resource?.id ? (
          <ListItem
            key={e.resource.id}
            id={e.resource.id}
            className="bg-teal-500"
            children={<Conditions patientId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
