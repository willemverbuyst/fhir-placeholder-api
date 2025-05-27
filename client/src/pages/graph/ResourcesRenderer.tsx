import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type { JSX } from "react";
import { isBundle, isResource } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { List } from "./List";
import { ListItem } from "./ListItem";

export function ResourcesRenderer<T extends Resource>({
  url,
  renderItem,
}: {
  url: string;
  renderItem?: (resource: T) => JSX.Element | undefined;
}) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<T>({ url }),
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (isBundle(data) && data.entry) {
    return (
      <List>
        {data.entry?.map((e) =>
          e.resource?.id ? (
            <ListItem key={e.resource.id} id={e.resource.id}>
              {renderItem?.(e.resource)}
            </ListItem>
          ) : null,
        )}
      </List>
    );
  }

  if (isResource(data) && data.id) {
    return (
      <ListItem key={data.id} id={data.id}>
        {renderItem?.(data)}
      </ListItem>
    );
  }

  return null;
}
