import type { Organization } from "fhir/r5";
import type React from "react";
import { organizations } from "../../dummyData/organization";
import { SearchSortAndFilter } from "../SearchSortAndFilter";
import { OrganizationCard } from "./OrganizationCard";

export function OrganizationSearchSortAndFilter(): React.JSX.Element {
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
        <OrganizationCard {...organization} key={organization.id} />
      )}
    </SearchSortAndFilter>
  );
}
