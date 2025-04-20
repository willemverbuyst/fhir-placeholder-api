import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetConditionsForPatientQueryOptions } from "../query/condition.query";
import { Episodes } from "./episode.resource";

export function Conditions({ patientId }: { patientId: string }) {
  const { isPending, error, data } = useQuery(
    createGetConditionsForPatientQueryOptions(patientId)
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
            className="bg-violet-500"
            children={<Episodes conditionId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
