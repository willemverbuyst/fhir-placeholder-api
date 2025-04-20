import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetOrganizationsQueryOptions } from "../query/organizations.query";
import { OrganizationResource } from "./organization.resource";

export function Organizations() {
  const { isPending, error, data } = useQuery(
    createGetOrganizationsQueryOptions()
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) => (
        <OrganizationResource entry={e} key={e.resource?.id} />
      ))}
    </List>
  );
}
