import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetConditionsForPatientQueryOptions } from "../query/condition.query";
import { ConditionResource } from "./condition.resource";

export function Conditions({ patientId }: { patientId: string }) {
  const { isPending, error, data } = useQuery(
    createGetConditionsForPatientQueryOptions(patientId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <ConditionResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
