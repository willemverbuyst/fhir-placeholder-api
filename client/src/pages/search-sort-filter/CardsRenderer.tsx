import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type React from "react";
import { Card } from "../../components/Card";
import type {
  ConfigItem,
  MappedResource,
  MappedResources,
} from "../../config/fhirResources";
import { isBundle } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { SearchSortAndFilter } from "./SearchSortAndFilter";

export function CardsRenderer<T extends Resource>(props: {
  item: ConfigItem<T>;
}): React.JSX.Element | null {
  const {
    resourceType,
    filterKeys,
    initialFilterProperties,
    initialSearchQuery,
    initialSortProperty,
    searchProperties,
    bgColor,
    cardRows,
  } = props.item;
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<T & { id: string }>({ url: resourceType }),
  );

  if (isPending) return <p>...loading</p>;

  if (error) return <p>...error</p>;

  if (!isBundle(data) || !data.entry) return null;

  const resources = data.entry.reduce(
    (acc, item) => {
      if (item.resource) {
        acc.push(item.resource);
      }
      return acc;
    },
    [] as (T & { id: string })[],
  );

  const mappedResources = resources.reduce((acc: MappedResources<T>, it) => {
    const mappedResource: MappedResource<T> = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(it).forEach(([k, v]) => {
      if (!(k in cardRows)) return;
      const key = k as keyof T;

      mappedResource[key] = {
        display: cardRows[key]?.display?.(v) ?? "",
        value: v,
      };
    });
    if (Object.keys(mappedResource).length) {
      acc.push(mappedResource);
    }
    return acc;
  }, []);

  if (resources.length) {
    return (
      <SearchSortAndFilter<MappedResource<T>>
        dataSource={mappedResources}
        searchProperties={searchProperties}
        filterKeys={filterKeys}
        sortKeys={Object.keys(cardRows) as (keyof T)[]}
        initialSortProperty={initialSortProperty}
        initialFilterProperties={initialFilterProperties}
        initialSearchQuery={initialSearchQuery}
      >
        {(resource): React.JSX.Element => (
          <Card
            key={resource.id?.display}
            bgColor={bgColor}
            headerText={resource.id?.display}
            content={
              <section className="flex flex-col gap-2">
                {Object.entries(resource).map(([k, v]) => {
                  return (
                    <div key={String(k)} className="flex justify-between">
                      <p className="font-semibold">{String(k)}</p>
                      <p>{v.display}</p>
                    </div>
                  );
                })}
              </section>
            }
          />
        )}
      </SearchSortAndFilter>
    );
  }
  return null;
}
