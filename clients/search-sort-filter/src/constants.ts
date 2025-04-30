import type { Organization, Patient, Resource } from "fhir/r5";
import type { Filter } from "./interfaces/Filter";
import type { Sorter } from "./interfaces/Sorter";

export type ConfigItem<T extends Resource> = {
  resourceType: T["resourceType"];
  bgColor: string;
  filterKeys: (keyof T)[];
  sortKeys: (keyof T)[];
  searchProperties: (keyof T)[];
  initialSortProperty: Sorter<T>;
  initialFilterProperties: Filter<T>[];
  initialSearchQuery: "";
  cardKeys: (keyof T)[];
  url: T["resourceType"];
};

export const CONFIG_ITEMS: [ConfigItem<Organization>, ConfigItem<Patient>] = [
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

export type ResourceType = (typeof CONFIG_ITEMS)[number]["resourceType"];

// export const CONFIG_ITEMS = [
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
