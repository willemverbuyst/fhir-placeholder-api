import { useQuery } from "@tanstack/react-query";
import { Resource } from "fhir/r5";
import { JSX } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";

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

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) =>
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
