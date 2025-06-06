import { InfoMessage } from "@/components/message/InfoMessage";
import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type { JSX } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorMessage } from "../../components/message/ErrorMessage";
import type { AppResourceType } from "../../config/fhirResources";
import type { MappedResource } from "../../interfaces/MappedResource";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { ResourceItem } from "./ResourceItem";

export function ResourcesRenderer<T extends Resource>({
  resourceType,
  searchParams,
  renderItem,
}: {
  resourceType: AppResourceType;
  searchParams?: string;
  renderItem?: (resource: MappedResource<T>) => JSX.Element | undefined;
}) {
  const { isPending, isError, error, data } = useQuery(
    createResourcesQueryOptions<T>({ resourceType, searchParams }),
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;
  if (!data) return <InfoMessage message="no data" />;

  return (
    <section className="flex flex-col gap-3">
      {data?.map((e) =>
        e.id ? (
          <ResourceItem key={String(e.id)} id={String(e.id)}>
            {renderItem?.(e)}
          </ResourceItem>
        ) : null,
      )}
    </section>
  );
}
