import { useQuery } from "@tanstack/react-query";
import type { Patient } from "fhir/r5";
import type React from "react";
import { isBundle } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { Card } from "../Card";
import { SearchSortAndFilter } from "../SearchSortAndFilter";

export function PatientSearchSortAndFilter(): React.JSX.Element | null {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Patient & { id: string }>({ url: "Patient" }),
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
    [] as (Patient & { id: string })[],
  );

  if (resources.length) {
    return (
      <SearchSortAndFilter<Patient & { id: string }>
        dataSource={resources}
        searchProperties={["gender"]}
        filterKeys={["active"]}
        sortKeys={["gender", "birthDate", "id"]}
        initialSortProperty={{
          property: "id",
          isDescending: true,
        }}
        initialFilterProperties={[]}
        initialSearchQuery=""
      >
        {(patient): React.JSX.Element => (
          <Card<Patient>
            key={patient.id}
            title={patient.name
              ?.map((n) => `${n.given?.join(" ")} ${n.family}`)
              .join(", ")}
            labelsAndValues={
              new Map([
                ["id", patient.id],
                ["birthDate", patient.birthDate],
                ["gender", patient.gender],
                ["active", JSON.stringify(patient.active)],
              ])
            }
            className="bg-teal-500"
          />
        )}
      </SearchSortAndFilter>
    );
  }
  return null;
}
