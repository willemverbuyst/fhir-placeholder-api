import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetOrganizationsQueryOptions } from "../query/organizations.query";
import { OrganizationResource } from "./organization.resource";

export function Organizations() {
  const { isPending, error, data } = useQuery(
    createGetOrganizationsQueryOptions()
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <OrganizationResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
