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
  const { resourceType, initialFilterProperties, bgColor, cardRows } =
    props.item;
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

  function getSortKeys() {
    return Object.entries(cardRows).reduce(
      (acc, [k, v]) => {
        if (v.sorter) {
          acc.push(k as keyof T);
        }
        return acc;
      },
      [] as (keyof T)[],
    );
  }

  function getFilterKeys() {
    return Object.entries(cardRows).reduce(
      (acc, [k, v]) => {
        if (v.filter) {
          acc.push(k as keyof T);
        }
        return acc;
      },
      [] as (keyof T)[],
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
    const sortProperty = Object.values(cardRows).find(
      (v) => v.sorter === "asc" || v.sorter === "desc",
    );

    return sortProperty
      ? {
          property: sortProperty.value as keyof T,
          isDescending: sortProperty.sorter === "desc",
        }
      : { property: "id" as keyof T, isDescending: false };
  }

  if (resources.length) {
    return (
      <SearchSortAndFilter<MappedResource<T>>
        dataSource={mappedResources}
        searchProperties={getSearchProperties()}
        filterKeys={getFilterKeys()}
        sortKeys={getSortKeys()}
        initialSortProperty={getInitialSortProperty()}
        initialFilterProperties={initialFilterProperties}
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
