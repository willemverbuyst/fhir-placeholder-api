import { useQuery } from "@tanstack/react-query";
import { Resource } from "fhir/r5";
import { JSX } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourceQueryOptions } from "../query/resource.query";

export function ResourceRenderer<T extends Resource>({
  url,
  className,
  renderItem,
}: {
  url: string;
  className: string;
  renderItem?: (data: T) => JSX.Element;
}) {
  const { isPending, error, data } = useQuery(
    createResourceQueryOptions<T>({ url })
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (!data.id) return null;

  return (
    <ListItem
      key={data.id}
      id={data.id}
      className={className}
      children={renderItem && renderItem(data)}
    />
  );
}
