import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetEpisodesForConditionQueryOptions } from "../query/episode.query";
import { EpisodeResource } from "./episode.resource";

export function Episodes({ conditionId }: { conditionId: string }) {
  const { isPending, error, data } = useQuery(
    createGetEpisodesForConditionQueryOptions(conditionId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <EpisodeResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
