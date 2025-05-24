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
import { getSortKeys } from "../../lib/sort";
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

  function getFilterKeys() {
    return Object.entries(cardRows).reduce(
      (acc, it) => {
        const [k, v] = it;

        if (v.filter) {
          const filterKeys = new Set<string | boolean>();
          for (const r of mappedResources) {
            // @ts-ignore
            filterKeys.add(r[k]);
          }

          // @ts-ignore
          acc[k] = filterKeys;
        }
        return acc;
      },
      {} as Record<keyof T, Set<string | boolean>>,
    );
  }

  function getSearchProperties() {
    return Object.entries(cardRows).reduce(
      (acc, [k, v]) => {
        if (v.search) {
          acc.push(k as keyof T);
        }
        return acc;
      },
      [] as (keyof T)[],
    );
  }

  function getInitialSortProperty() {
    const property = Object.entries(cardRows).find(
      ([_, v]) => v.sorter === "asc" || v.sorter === "desc",
    );

    const [k, v] = property ?? [];

    return k && v
      ? {
          property: k as keyof T,
          isDescending: v.sorter === "desc",
        }
      : { property: "id" as keyof T, isDescending: false };
  }

  if (resources.length) {
    return (
      <SearchSortFilter<MappedResource<T>>
        dataSource={mappedResources}
        searchProperties={getSearchProperties()}
        filterKeys={getFilterKeys()}
        sortKeys={getSortKeys<T>(cardRows)}
        initialSortProperty={getInitialSortProperty()}
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
