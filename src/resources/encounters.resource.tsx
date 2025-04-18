import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetEncountersForEpisodeQueryOptions } from "../query/encounter.query";
import { EncounterResource } from "./encounter.resource";

export function Encounters({ episodeId }: { episodeId: string }) {
  const { isPending, error, data } = useQuery(
    createGetEncountersForEpisodeQueryOptions(episodeId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="p-4">
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <EncounterResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
