import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetEncountersForEpisodeQueryOptions } from "../query/encounter.query";
import { EncounterResource } from "./encounter.resource";

export function Encounters({ episodeId }: { episodeId: string }) {
  const { isPending, error, data } = useQuery(
    createGetEncountersForEpisodeQueryOptions(episodeId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <p>`An error has occurred: ${error.message}`</p>;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) => (
        <EncounterResource entry={e} key={e.resource?.id} />
      ))}
    </List>
  );
}
