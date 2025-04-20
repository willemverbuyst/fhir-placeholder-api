import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetEncountersForEpisodeQueryOptions } from "../query/encounter.query";
import { Observations } from "./observation.resource";

export function Encounters({ episodeId }: { episodeId: string }) {
  const { isPending, error, data } = useQuery(
    createGetEncountersForEpisodeQueryOptions(episodeId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <p>`An error has occurred: ${error.message}`</p>;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) =>
        e.resource?.id ? (
          <ListItem
            key={e.resource.id}
            id={e.resource.id}
            className="bg-green-600"
            children={<Observations encounterId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
