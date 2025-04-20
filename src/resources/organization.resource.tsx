import { useQuery } from "@tanstack/react-query";
import { Organization } from "fhir/r5";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";
import { PractitionerRoles } from "./practitioner-role.resource";

export function Organizations() {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Organization>({
      url: "Organization",
      queryKeys: ["organization"],
    })
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) =>
        e.resource?.id ? (
          <ListItem
            key={e.resource.id}
            id={e.resource.id}
            className="bg-amber-800"
            children={<PractitionerRoles organizationId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
