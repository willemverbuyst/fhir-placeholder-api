import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type { JSX } from "react";
import type { AppResourceType } from "../../config/fhirResources";
import type { MappedResource } from "../../interfaces/MappedResource";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { List } from "./List";
import { ListItem } from "./ListItem";

export function ResourcesRenderer<T extends Resource>({
  resourceType,
  searchParams,
  renderItem,
}: {
  resourceType: AppResourceType;
  searchParams?: string;
  renderItem?: (resource: MappedResource<T>) => JSX.Element | undefined;
}) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<T>({ resourceType, searchParams }),
  );

  if (isPending) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>...no data</p>;

  return (
    <List>
      {data?.map((e) =>
        e.id ? (
          <ListItem key={e.id} id={e.id}>
            {renderItem?.(e)}
          </ListItem>
        ) : null,
      )}
    </List>
  );
}
