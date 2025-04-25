import { useQuery } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import type { JSX } from "react";
import { createResourcesQueryOptions } from "../query/resources.query";
import { ErrorMessage } from "./ErrorMessage";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { LoadingSpinner } from "./LoadingSpinner";

function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}

function isResource<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is T {
  return !!data && "id" in data && !!data.id;
}
export function ResourcesRenderer<T extends Resource>({
  url,
  className,
  renderItem,
}: {
  url: string;
  className: string;
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
            <ListItem
              key={e.resource.id}
              id={e.resource.id}
              className={className}
            >
              {renderItem?.(e.resource)}
            </ListItem>
          ) : null,
        )}
      </List>
    );
  }

  if (isResource(data) && data.id) {
    return (
      <ListItem key={data.id} id={data.id} className={className}>
        {renderItem?.(data)}
      </ListItem>
    );
  }

  return null;
}
