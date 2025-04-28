import { useQuery } from "@tanstack/react-query";
import type { Bundle, Patient, Resource } from "fhir/r5";
import type React from "react";
import { patients } from "../../dummyData/patient";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { SearchSortAndFilter } from "../SearchSortAndFilter";
import { PatientCard } from "./PatientCard";

function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}

export function PatientSearchSortAndFilter(): React.JSX.Element | null {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Patient>({ url: "Patient" }),
  );

  if (isPending) return <p>...loading</p>;

  if (error) return <p>...error</p>;

  if (isBundle(data) && data.entry) {
    return (
      <SearchSortAndFilter<Patient & { id: string }>
        dataSource={patients}
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
          <PatientCard {...patient} key={patient.id} />
        )}
      </SearchSortAndFilter>
    );
  }
  return null;
}
