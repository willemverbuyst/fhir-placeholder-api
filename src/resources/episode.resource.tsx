import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetEpisodesForConditionQueryOptions } from "../query/episode.query";
import { Encounters } from "./encounter.resource";

export function Episodes({ conditionId }: { conditionId: string }) {
  const { isPending, error, data } = useQuery(
    createGetEpisodesForConditionQueryOptions(conditionId)
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
            className="bg-blue-900"
            children={<Encounters episodeId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
