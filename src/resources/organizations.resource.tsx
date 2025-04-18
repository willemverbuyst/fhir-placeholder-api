import { useQuery } from "@tanstack/react-query";
import { fetchOrganizations } from "../query/organizations.query";

export function Organizations() {
  const { isPending, error, data } = useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <ul>
      {data.entry?.map(({ resource }) => (
        <li key={resource?.id}>{resource?.id}</li>
      ))}
    </ul>
  );
}
