import { useQuery } from "@tanstack/react-query";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPractitionerQueryOptions } from "../query/practitioner.query";
import { Patients } from "./patients.resource";

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

  if (!data.id) return null;

  return (
    <ListItem
      id={data.id}
      className="bg-amber-400"
      children={<Patients practitionerId={data.id} />}
    />
  );
}
