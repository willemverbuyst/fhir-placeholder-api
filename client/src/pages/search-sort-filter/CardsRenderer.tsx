import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type React from "react";
import { Card } from "../../components/Card";
import type { ConfigItem } from "../../config/fhirResources";
import type {
  MappedResource,
  MappedResources,
} from "../../interfaces/MappedResource";
import { getResourcesFromBundle, isBundle } from "../../lib/fhir";
import { getFilterKeys } from "../../lib/filter";
import { getSearchProperties } from "../../lib/search";
import { getInitialSortProperty, getSortKeys } from "../../lib/sort";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { SearchSortFilter } from "./SearchSortFilter";

export function CardsRenderer<T extends Resource>(props: {
  item: ConfigItem<T>;
}): React.JSX.Element | null {
  const { resourceType, bgColor, cardRows } = props.item;
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<T & { id: string }>({ url: resourceType }),
  );

  if (isPending) return <p>...loading</p>;

  if (error) return <p>...error</p>;

  if (!isBundle(data)) return <p>...no data</p>;

  const resources = getResourcesFromBundle<T>(data);

  const mappedResources = resources.reduce((acc: MappedResources<T>, it) => {
    const mappedResource: MappedResource<T> = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(it).forEach(([k, v]) => {
      if (!(k in cardRows)) return;
      const key = k as keyof T;

      mappedResource[key] = cardRows[key]?.display?.(v) ?? "";
    });
    if (Object.keys(mappedResource).length) {
      acc.push(mappedResource);
    }
    return acc;
  }, []);

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
            bgColor={bgColor}
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
