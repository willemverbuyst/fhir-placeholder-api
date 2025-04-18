import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPractitionerQueryOptions } from "../query/practitioner.query";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string;
}) {
  const { isPending, error, data } = useQuery(
    createGetPractitionerQueryOptions(practitionerId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="flex gap-3">
      <div className="bg-teal-700 p-5 rounded-md text-white">{data?.id}</div>
    </section>
  );
}
