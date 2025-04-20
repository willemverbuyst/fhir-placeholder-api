import { useQuery } from "@tanstack/react-query";
import { Observation } from "fhir/r5";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";

export function Observations({ encounterId }: { encounterId: string }) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Observation>({
      url: `Observation?encounter=${encounterId}`,
      queryKeys: ["observation", encounterId],
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
            className="bg-pink-600"
          />
        ) : null
      )}
    </List>
  );
}
