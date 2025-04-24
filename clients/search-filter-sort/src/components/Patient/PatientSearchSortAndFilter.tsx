import { Patient } from "fhir/r5";
import React from "react";
import { patients } from "../../dummyData/patient";
import { SearchSortAndFilter } from "../SearchSortAndFilter";
import { PatientCard } from "./PatientCard";

export function PatientSearchSortAndFilter(): React.JSX.Element {
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
