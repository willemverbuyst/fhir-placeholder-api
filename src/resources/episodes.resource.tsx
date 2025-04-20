import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetEpisodesForConditionQueryOptions } from "../query/episode.query";
import { EpisodeResource } from "./episode.resource";

export function Episodes({ conditionId }: { conditionId: string }) {
  const { isPending, error, data } = useQuery(
    createGetEpisodesForConditionQueryOptions(conditionId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) => (
        <EpisodeResource entry={e} key={e.resource?.id} />
      ))}
    </List>
  );
}
