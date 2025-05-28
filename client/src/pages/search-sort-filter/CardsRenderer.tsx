import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type React from "react";
import type { ConfigItem } from "../../config/fhirResources";
import type { MappedResource } from "../../interfaces/MappedResource";
import { getResourcesFromBundle, isBundle } from "../../lib/fhir";
import { getFilterKeys } from "../../lib/filter";
import { getMappedResources } from "../../lib/mappedResources";
import { getSearchProperties } from "../../lib/search";
import { getInitialSortProperty, getSortKeys } from "../../lib/sort";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { Card } from "../../ui/Card";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { SearchSortFilter } from "./SearchSortFilter";

export function CardsRenderer<T extends Resource>(props: {
  item: ConfigItem<T>;
}): React.JSX.Element | null {
  const { resourceType, cardRows } = props.item;
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<T & { id: string }>({ url: resourceType }),
  );

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>...error</p>;
  if (!isBundle(data)) return <p>...no data</p>;

  const resources = getResourcesFromBundle<T>(data);
  const mappedResources = getMappedResources<T>(resources, cardRows);

  if (resources.length) {
    return (
      <SearchSortFilter<MappedResource<T>>
        dataSource={mappedResources}
        searchProperties={getSearchProperties<T>(cardRows)}
        filterKeys={getFilterKeys<T>(cardRows, mappedResources)}
        sortKeys={getSortKeys<T>(cardRows)}
        initialSortProperty={getInitialSortProperty<T>(cardRows)}
      >
        {(resource): React.JSX.Element => (
          <Card
            key={resource.id}
            headerText={resource.id}
            content={
              <section className="flex flex-col gap-2">
                {Object.entries(resource).map(([k, v]) => {
                  return (
                    <div
                      key={String(k)}
                      className="flex flex-col lg:flex-row lg:justify-between"
                    >
                      <p className="font-semibold">{String(k)}</p>
                      <p>{v}</p>
                    </div>
                  );
                })}
              </section>
            }
          />
        )}
      </SearchSortFilter>
    );
  }
  return null;
}
