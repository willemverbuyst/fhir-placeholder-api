import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type React from "react";
import type { ConfigItem } from "../../config/fhirResources";
import { isBundle } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { SearchSortAndFilter } from "./SearchSortAndFilter";

export function CardsRenderer<T extends Resource>(props: {
  item: ConfigItem<T>;
}): React.JSX.Element | null {
  const {
    resourceType,
    filterKeys,
    sortKeys,
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

  if (resources.length) {
    return (
      <SearchSortAndFilter<T>
        dataSource={resources}
        searchProperties={searchProperties}
        filterKeys={filterKeys}
        sortKeys={sortKeys}
        initialSortProperty={initialSortProperty}
        initialFilterProperties={initialFilterProperties}
        initialSearchQuery={initialSearchQuery}
      >
        {(resource): React.JSX.Element => (
          <section
            className={`w-[350px] text-white rounded-md p-4 ${bgColor}`}
            key={resource.id}
          >
            <section className="mb-6">
              <h2 className="text-center uppercase text-xl py-2">
                {resource.id}
              </h2>
            </section>
            <section className="flex flex-col gap-2">
              {Object.entries(cardRows ?? {}).map(([k, v]) => {
                return (
                  <div key={String(k)} className="flex justify-between">
                    <p className="font-semibold">{String(k)}</p>
                    <p>
                      {typeof v === "string"
                        ? resource[k as keyof typeof cardRows]
                        : v(resource[k as keyof typeof cardRows])}
                    </p>
                  </div>
                );
              })}
            </section>
          </section>
        )}
      </SearchSortAndFilter>
    );
  }
  return null;
}
