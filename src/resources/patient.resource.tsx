import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPatientsForPractitionerQueryOptions } from "../query/patient.query";
import { Conditions } from "./condition.resource";

export function Patients({ practitionerId }: { practitionerId: string }) {
  const { isPending, error, data } = useQuery(
    createGetPatientsForPractitionerQueryOptions(practitionerId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

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
