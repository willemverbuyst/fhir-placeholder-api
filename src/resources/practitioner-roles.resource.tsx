import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPractitionerRolesForOrganizationQueryOptions } from "../query/practitioner-role.query";
import { PractitionerRoleResource } from "./practitioner-role.resource";

export function PractitionerRoles({
  organizationId,
}: {
  organizationId: string;
}) {
  const { isPending, error, data } = useQuery(
    createGetPractitionerRolesForOrganizationQueryOptions(organizationId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <PractitionerRoleResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
