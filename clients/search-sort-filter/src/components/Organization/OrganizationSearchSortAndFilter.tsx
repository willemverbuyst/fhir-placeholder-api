import { useQuery } from "@tanstack/react-query";
import type { Organization } from "fhir/r5";
import type React from "react";
import { organizations } from "../../dummyData/organization";
import { isBundle } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { Card } from "../Card";
import { SearchSortAndFilter } from "../SearchSortAndFilter";

export function OrganizationSearchSortAndFilter(): React.JSX.Element | null {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Organization & { id: string }>({
      url: "Organization",
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
      <SearchSortAndFilter<Organization & { id: string }>
        dataSource={organizations}
        searchProperties={["name"]}
        filterKeys={["active"]}
        sortKeys={["name", "id"]}
        initialSortProperty={{
          property: "id",
          isDescending: true,
        }}
        initialFilterProperties={[]}
        initialSearchQuery=""
      >
        {(organization): React.JSX.Element => (
          <Card<Organization>
            key={organization.id}
            title={organization.name}
            labelsAndValues={
              new Map([
                ["id", organization.id],
                ["active", JSON.stringify(organization.active)],
              ])
            }
            className="bg-amber-800"
          />
        )}
      </SearchSortAndFilter>
    );
  }
  return null;
}
