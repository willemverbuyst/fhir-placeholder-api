import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetConditionsForPatientQueryOptions } from "../query/condition.query";
import { ConditionResource } from "./condition.resource";

export function Conditions({ patientId }: { patientId: string }) {
  const { isPending, error, data } = useQuery(
    createGetConditionsForPatientQueryOptions(patientId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) => (
        <ConditionResource entry={e} key={e.resource?.id} />
      ))}
    </List>
  );
}
