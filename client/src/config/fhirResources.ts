import type {
  Appointment,
  Condition,
  Encounter,
  EpisodeOfCare,
  HumanName,
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
  bgColor: `bg-${string}-${number}${number}${number}`;
  filterKeys: (keyof T)[];
  sortKeys: (keyof T)[];
  searchProperties: (keyof T)[];
  initialSortProperty: Sorter<T>;
  initialFilterProperties: Filter<T>[];
  initialSearchQuery: "";
  // biome-ignore lint/suspicious/noExplicitAny: <TODO>
  cardRows?: Partial<Record<keyof T, string | ((v: any) => string)>>;
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
    bgColor: "bg-teal-600",
    searchProperties: ["id"],
    filterKeys: [],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: { id: "id" },
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
    cardRows: { id: "id" },
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
    cardRows: { id: "id" },
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
    cardRows: { id: "id" },
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
    cardRows: { id: "id" },
  },
  Organization: {
    resourceType: "Organization",
    bgColor: "bg-amber-950",
    searchProperties: ["name"],
    filterKeys: ["active"],
    sortKeys: ["name", "id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: "id",
      active: (v) => JSON.stringify(v),
      name: "name",
    },
  },
  Patient: {
    resourceType: "Patient",
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
    cardRows: {
      id: "id",
      birthDate: "birthDate",
      active: (v) => JSON.stringify(v),
      gender: "gender",
      name: (v) =>
        v
          ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
          .join(", "),
    },
  },
  Practitioner: {
    resourceType: "Practitioner",
    bgColor: "bg-amber-600",
    searchProperties: ["gender"],
    filterKeys: ["active"],
    sortKeys: ["gender", "birthDate", "id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: "id",
      birthDate: "birthDate",
      active: (v) => JSON.stringify(v),
      gender: "gender",
      name: (v) =>
        v
          ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
          .join(", "),
    },
  },
  PractitionerRole: {
    resourceType: "PractitionerRole",
    bgColor: "bg-amber-800",
    searchProperties: [],
    filterKeys: ["active"],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: "id",
      active: (v) => JSON.stringify(v),
    },
  },
};
