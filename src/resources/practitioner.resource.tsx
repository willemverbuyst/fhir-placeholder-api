import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "../components/ErrorMessage";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPractitionerQueryOptions } from "../query/practitioner.query";
import { Patients } from "./patient.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string;
}) {
  const { isPending, error, data } = useQuery(
    createGetPractitionerQueryOptions(practitionerId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (!data.id) return null;

  return (
    <ListItem
      id={data.id}
      className="bg-amber-400"
      children={<Patients practitionerId={data.id} />}
    />
  );
}
