import type { Organization, Patient } from "fhir/r5";
import type { Filter } from "./interfaces/Filter";
import type { Sorter } from "./interfaces/Sorter";

export type PatientConfig = {
  resourceType: Patient["resourceType"];
  bgColor: string;
  filterKeys: (keyof Patient)[];
  sortKeys: (keyof Patient)[];
  searchProperties: (keyof Patient)[];
  initialSortProperty: Sorter<Patient>;
  initialFilterProperties: Filter<Patient>[];
  initialSearchQuery: "";
  cardKeys: (keyof Patient)[];
  url: Patient["resourceType"];
};

export type OrganizationConfig = {
  resourceType: Organization["resourceType"];
  bgColor: string;
  filterKeys: (keyof Organization)[];
  sortKeys: (keyof Organization)[];
  searchProperties: (keyof Organization)[];
  initialSortProperty: Sorter<Organization>;
  initialFilterProperties: Filter<Organization>[];
  initialSearchQuery: "";
  cardKeys: (keyof Organization)[];
  url: Organization["resourceType"];
};

export const RESOURCES: [OrganizationConfig, PatientConfig] = [
  {
    resourceType: "Organization",
    bgColor: "bg-amber-800",
    searchProperties: ["name"],
    filterKeys: ["active"],
    sortKeys: ["name", "id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardKeys: ["id", "active"],
    url: "Organization",
  },
  {
    resourceType: "Patient",

    bgColor: "bg-teal-500",
    searchProperties: ["gender"],
    filterKeys: ["active"],
    sortKeys: ["gender", "birthDate", "id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardKeys: ["id", "birthDate", "gender", "active"],
    url: "Patient",
  },
];

export type ResourceType = (typeof RESOURCES)[number]["resourceType"];

// export const RESOURCES = [
//   {
//     resourceType: "Organization",
//     bgColor: "bg-amber-800",
//     searchProperties: ["name"],
//     filterKeys: ["active"],
//     sortKeys: ["name", "id"],
//     initialSortProperty: {
//       property: "id",
//       isDescending: true,
//     },
//     initialFilterProperties: [],
//     initialSearchQuery: "",
//     cardKeys: ["id", "active"],
//   },
//   {
//     resourceType: "PractitionerRole",
//     bgColor: "bg-amber-600",
//   },
//   {
//     resourceType: "Practitioner",
//     bgColor: "bg-amber-400",
//   },
//   {
//     resourceType: "Patient",

//     bgColor: "bg-teal-500",
//     searchProperties: ["gender"],
//     filterKeys: ["active"],
//     sortKeys: ["gender", "birthDate", "id"],
//     initialSortProperty: {
//       property: "id",
//       isDescending: true,
//     },
//     initialFilterProperties: [],
//     initialSearchQuery: "",
//     cardKeys: ["id", "birthDate", "gender", "active"],
//     url: "/Patient",
//   },
//   {
//     resourceType: "Condition",
//     bgColor: "bg-violet-500",
//   },
//   {
//     resourceType: "EpisodeOfCare",
//     bgColor: "bg-blue-900",
//   },
//   {
//     resourceType: "Encounter",
//     bgColor: "bg-green-600",
//   },
//   {
//     resourceType: "Observation",
//     bgColor: "bg-pink-600",
//   },
// ] as const;
