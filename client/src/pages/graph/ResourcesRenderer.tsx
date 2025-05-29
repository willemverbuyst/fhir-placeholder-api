import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type { JSX } from "react";
import { isResource } from "../../lib/fhir";
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

  if (Array.isArray(data)) {
    return (
      <List>
        {data.map((e) =>
          e.id ? (
            <ListItem key={e.id} id={e.id}>
              {renderItem?.(e)}
            </ListItem>
          ) : null,
        )}
      </List>
    );
  }

  if (data.id && isResource(data)) {
    return (
      <ListItem key={data.id} id={data.id}>
        {renderItem?.(data as T)}
      </ListItem>
    );
  }

  return null;
}
