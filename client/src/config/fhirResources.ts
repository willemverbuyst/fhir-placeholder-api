import type {
  Appointment,
  Condition,
  Encounter,
  EpisodeOfCare,
  Observation,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
  Resource,
} from "fhir/r5";
import type { Filter } from "../interfaces/Filter";
import type { Sorter } from "../interfaces/Sorter";

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

export type ConfigItems = {
  Appointment: ConfigItem<Appointment>;
  Condition: ConfigItem<Condition>;
  Encounter: ConfigItem<Encounter>;
  EpisodeOfCare: ConfigItem<EpisodeOfCare>;
  Observation: ConfigItem<Observation>;
  Organization: ConfigItem<Organization>;
  Patient: ConfigItem<Patient>;
  Practitioner: ConfigItem<Practitioner>;
  PractitionerRole: ConfigItem<PractitionerRole>;
};

export const FHIR_RESOURCES: ConfigItems = {
  Appointment: {
    resourceType: "Appointment",
    bgColor: "bg-amber-800",
    searchProperties: ["id"],
    filterKeys: [],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardKeys: ["id"],
    url: "Appointment",
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
  },
  Encounter: {
    resourceType: "Encounter",
    bgColor: "bg-green-600",
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
    url: "Encounter",
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
  },
  Observation: {
    resourceType: "Observation",
    bgColor: "bg-pink-600",
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
    url: "Observation",
  },
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
    cardKeys: ["id", "active", "name"],
    url: "Organization",
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
  },
};
