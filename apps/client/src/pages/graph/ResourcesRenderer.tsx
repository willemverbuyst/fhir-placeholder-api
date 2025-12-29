import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type { JSX } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { AppResourceType } from "../../config/fhirResources";
import type { MappedResource } from "../../interfaces/MappedResource";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { ResourceItem } from "./ResourceItem";

export function ResourcesRenderer<T extends Resource>({
  resourceType,
  searchParams,
  renderItem,
  styles,
}: {
  resourceType: AppResourceType;
  searchParams?: string;
  renderItem?: (resource: MappedResource<T>) => JSX.Element | null;
  styles?: string;
}) {
  const { isPending, isError, error, data } = useQuery(
    createResourcesQueryOptions<T>({ resourceType, searchParams }),
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="no data" />;

  return (
    <section className={cn("flex flex-col gap-3")}>
      {data?.map((e) =>
        e.id ? (
          <ResourceItem
            key={String(e.id)}
            id={String(e.id)}
            resourceType={resourceType}
          >
            {renderItem?.(e)}
          </ResourceItem>
        ) : null,
      )}
    </section>
  );
}
