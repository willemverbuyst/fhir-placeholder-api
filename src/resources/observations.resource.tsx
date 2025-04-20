import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetObservationsForEncounterQueryOptions } from "../query/observation.query";
import { ObservationResource } from "./observation.resource";

export function Observations({ encounterId }: { encounterId: string }) {
  const { isPending, error, data } = useQuery(
    createGetObservationsForEncounterQueryOptions(encounterId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) => (
        <ObservationResource entry={e} key={e.resource?.id} />
      ))}
    </List>
  );
}
