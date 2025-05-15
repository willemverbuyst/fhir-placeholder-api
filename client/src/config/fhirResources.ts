import type {
  Address,
  Annotation,
  Appointment,
  AppointmentParticipant,
  CodeableConcept,
  Condition,
  ContactPoint,
  Encounter,
  EpisodeOfCare,
  EpisodeOfCareDiagnosis,
  HumanName,
  Observation,
  Organization,
  Patient,
  PatientCommunication,
  Practitioner,
  PractitionerRole,
  Reference,
  Resource,
} from "fhir/r5";
import type { Filter } from "../interfaces/Filter";
import type { Sorter } from "../interfaces/Sorter";
import { getIdFromReference } from "../lib/fhir";

export type BGColor = `bg-${string}-${number}${number}${number}`;

export type MappedResource<T extends Resource> = Partial<
  Record<keyof T, string>
>;
export type MappedResources<T extends Resource> = MappedResource<T>[];

export type ConfigItem<T extends Resource> = {
  resourceType: T["resourceType"];
  bgColor: BGColor;
  filterKeys: (keyof MappedResource<T>)[];
  sortKeys: (keyof MappedResource<T>)[];
  searchProperties: (keyof MappedResource<T>)[];
  initialSortProperty: Sorter<MappedResource<T>>;
  initialFilterProperties: Filter<MappedResource<T>>[];
  initialSearchQuery: "";
  // biome-ignore lint/suspicious/noExplicitAny: <TODO>
  cardRows: Partial<Record<keyof T, string | ((v: any) => string)>>;
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
    cardRows: {
      id: "id",
      status: "status",
      subject: (v: Reference) => getIdFromReference(v) ?? "",
      participant: (v: AppointmentParticipant[]) =>
        v.map((p) => (p.actor && getIdFromReference(p.actor)) ?? "").join(", "),
    },
  },
  Condition: {
    resourceType: "Condition",
    bgColor: "bg-violet-500",
    searchProperties: ["note"],
    filterKeys: [],
    sortKeys: ["id"],
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: "id",
      subject: (v: Reference) => getIdFromReference(v) ?? "",
      note: (v: Annotation[] | undefined) =>
        v?.map((n) => n.text).join(" ") ?? "",
      clinicalStatus: (v: CodeableConcept) =>
        v.coding?.map((c) => c.code).join(", ") ?? "",
    },
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
    cardRows: {
      id: "id",
      status: "status",
      subject: (v: Reference) => getIdFromReference(v) ?? "",
      episodeOfCare: (v: Reference[]) =>
        v.map((r) => getIdFromReference(r) ?? "").join(", "),
    },
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
    cardRows: {
      id: "id",
      status: "status",
      patient: (v: Reference) => getIdFromReference(v) ?? "",
      type: (v: CodeableConcept[]) =>
        v.map((c) => c.coding?.map((c) => c.code).join(", ") ?? "").join(", "),
      diagnosis: (v: EpisodeOfCareDiagnosis[]) =>
        v
          .map((e) =>
            e.condition
              ?.map(
                (c) => (c.reference && getIdFromReference(c.reference)) ?? "",
              )
              .join(", "),
          )
          .join(", "),
    },
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
    cardRows: {
      id: "id",
      status: "status",
      code: (v: CodeableConcept) =>
        v.coding?.map((c) => c.code).join(", ") ?? "",
      encounter: (v: Reference) => getIdFromReference(v) ?? "",
      subject: (v: Reference) => getIdFromReference(v) ?? "",
      note: (v: Annotation[] | undefined) =>
        v?.map((n) => n.text).join(" ") ?? "",
    },
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
    searchProperties: ["gender", "name"],
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
      telecom: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
      managingOrganization: (v: Reference) => getIdFromReference(v) ?? "",
      generalPractitioner: (v: Reference[]) =>
        v.map((p) => getIdFromReference(p)).join(", ") ?? "",
      communication: (v: PatientCommunication[]) =>
        v.map((p) => p.language.coding?.map((c) => c.code)).join(", ") ?? "",
      address: (v: Address[]) =>
        v
          .map(
            (a) =>
              `${a.line?.join(", ")} ${a.city} ${a.state} ${a.postalCode} ${a.country}`,
          )
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
      telecom: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
      address: (v: Address[]) =>
        v
          .map(
            (a) =>
              `${a.line?.join(", ")} ${a.city} ${a.state} ${a.postalCode} ${a.country}`,
          )
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
      organization: (v) => getIdFromReference(v) ?? "",
      practitioner: (v) => getIdFromReference(v) ?? "",
    },
  },
};
