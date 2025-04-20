import { useQuery } from "@tanstack/react-query";
import { PractitionerRole } from "fhir/r5";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";
import { PractitionerResource } from "./practitioner.resource";

export function PractitionerRoles({
  organizationId,
}: {
  organizationId: string;
}) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<PractitionerRole>({
      url: `PractitionerRole?organization=${organizationId}`,
      queryKeys: ["practitionerRole", organizationId],
    })
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) =>
        e.resource?.id && e.resource?.practitioner?.reference?.split("/")[1] ? (
          <ListItem
            key={e.resource.id}
            id={e.resource.id}
            className="bg-amber-600"
            children={
              <PractitionerResource
                practitionerId={
                  e.resource?.practitioner?.reference?.split("/")[1]
                }
              />
            }
          />
        ) : null
      )}
    </List>
  );
}
