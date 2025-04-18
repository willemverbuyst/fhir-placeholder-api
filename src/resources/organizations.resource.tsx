import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetOrganizationsQueryOptions } from "../query/organizations.query";

export function Organizations() {
  const { isPending, error, data } = useQuery(
    createGetOrganizationsQueryOptions()
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <ul className="flex justify-between">
        {data.entry?.map(({ resource }) => (
          <li
            key={resource?.id}
            className="bg-amber-600 p-5 rounded-md text-white"
          >
            {resource?.id}
          </li>
        ))}
      </ul>
    </section>
  );
}
