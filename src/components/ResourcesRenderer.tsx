import { useQuery } from "@tanstack/react-query";
import { Bundle, Resource } from "fhir/r5";
import { JSX } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";

function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}

function isResource<T extends Resource>(
  data: T | Bundle<T> | undefined
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
    createResourcesQueryOptions<T>({ url })
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
              children={renderItem && renderItem(e.resource)}
            />
          ) : null
        )}
      </List>
    );
  }

  if (isResource(data) && data.id) {
    return (
      <ListItem
        key={data.id}
        id={data.id}
        className={className}
        children={renderItem && renderItem(data)}
      />
    );
  }

  return null;
}
