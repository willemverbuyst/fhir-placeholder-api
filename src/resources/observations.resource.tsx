import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetObservationsForEncounterQueryOptions } from "../query/observation.query";
import { ObservationResource } from "./observation.resource";

export function Observations({ encounterId }: { encounterId: string }) {
  const { isPending, error, data } = useQuery(
    createGetObservationsForEncounterQueryOptions(encounterId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="p-4">
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <ObservationResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
