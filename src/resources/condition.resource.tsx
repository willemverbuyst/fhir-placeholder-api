import { useQuery } from "@tanstack/react-query";
import { Condition } from "fhir/r5";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";
import { Episodes } from "./episode.resource";

export function Conditions({ patientId }: { patientId: string }) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Condition>({
      url: `Condition?patient=${patientId}`,
      queryKeys: ["condition", patientId],
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
            className="bg-violet-500"
            children={<Episodes conditionId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
