import { useQuery } from "@tanstack/react-query";
import type { Organization } from "fhir/r5";
import type React from "react";
import type { ConfigItem } from "../../constants";
import { isBundle } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { SearchSortAndFilter } from "../SearchSortAndFilter";

export function OrganizationCards(
  props: ConfigItem<Organization>,
): React.JSX.Element | null {
  const {
    url,
    filterKeys,
    sortKeys,
    initialFilterProperties,
    initialSearchQuery,
    initialSortProperty,
    searchProperties,
    bgColor,
    cardKeys,
  } = props;
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Organization & { id: string }>({
      url,
    }),
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
    [] as (Organization & { id: string })[],
  );

  if (resources.length) {
    return (
      <SearchSortAndFilter
        dataSource={resources}
        searchProperties={searchProperties}
        filterKeys={filterKeys}
        sortKeys={sortKeys}
        initialSortProperty={initialSortProperty}
        initialFilterProperties={initialFilterProperties}
        initialSearchQuery={initialSearchQuery}
      >
        {(resource): React.JSX.Element => (
          <section className={`w-[350px] text-white rounded-md p-4 ${bgColor}`}>
            <section className="mb-6">
              <h2 className="text-center uppercase text-xl py-2">
                {resource.id}
              </h2>
            </section>
            <section className="flex flex-col gap-2">
              {cardKeys.map((key) => {
                return (
                  <div key={String(key)} className="flex justify-between">
                    <p className="font-semibold">{String(key)}</p>
                    <p>
                      {/* @ts-ignore */}
                      {typeof resource[key] === "boolean"
                        ? JSON.stringify(resource[key])
                        : resource[key]}
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
