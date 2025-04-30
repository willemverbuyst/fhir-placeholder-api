import type {
  Condition,
  EpisodeOfCare,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
  Resource,
} from "fhir/r5";
import type React from "react";
import { CardsRenderer } from "./components/CardsRenderer";
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
  card: React.JSX.Element | null;
};

export type ConfigItems = {
  Condition: ConfigItem<Condition>;
  EpisodeOfCare: ConfigItem<EpisodeOfCare>;
  Organization: ConfigItem<Organization>;
  PractitionerRole: ConfigItem<PractitionerRole>;
  Practitioner: ConfigItem<Practitioner>;
  Patient: ConfigItem<Patient>;
};

export const CONFIG_ITEMS: ConfigItems = {
  Organization: {
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
    card: <CardsRenderer<Organization> resourceType={"Organization"} />,
  },
  PractitionerRole: {
    resourceType: "PractitionerRole",
    bgColor: "bg-amber-600",
    searchProperties: [],
    filterKeys: ["active"],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardKeys: ["id", "active"],
    url: "PractitionerRole",
    card: <CardsRenderer<PractitionerRole> resourceType={"PractitionerRole"} />,
  },
  Practitioner: {
    resourceType: "Practitioner",
    bgColor: "bg-amber-400",
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
    url: "Practitioner",
    card: <CardsRenderer<Practitioner> resourceType={"Practitioner"} />,
  },
  Patient: {
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
    card: <CardsRenderer<Patient> resourceType={"Patient"} />,
  },
  Condition: {
    resourceType: "Condition",
    bgColor: "bg-violet-500",
    searchProperties: [],
    filterKeys: [],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardKeys: ["id"],
    url: "Condition",
    card: <CardsRenderer<Condition> resourceType={"Condition"} />,
  },
  EpisodeOfCare: {
    resourceType: "EpisodeOfCare",
    bgColor: "bg-blue-900",
    searchProperties: [],
    filterKeys: [],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardKeys: ["id"],
    url: "EpisodeOfCare",
    card: <CardsRenderer<EpisodeOfCare> resourceType={"EpisodeOfCare"} />,
  },
};

// export const CONFIG_ITEMS = [

//   {
//     resourceType: "Encounter",
//     bgColor: "bg-green-600",
//   },
//   {
//     resourceType: "Observation",
//     bgColor: "bg-pink-600",
//   },
// ] as const;
