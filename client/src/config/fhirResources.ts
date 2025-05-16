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
  Record<keyof T, { display: string; value: keyof T }>
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
  cardRows: Partial<
    // biome-ignore lint/suspicious/noExplicitAny: <TODO>
    Record<keyof T, { display: string | ((v: any) => string); value: keyof T }>
  >;
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
      id: { display: "id", value: "id" },
      status: { display: "status", value: "status" },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
      },
      participant: {
        display: (v: AppointmentParticipant[]) =>
          v
            .map((p) => (p.actor && getIdFromReference(p.actor)) ?? "")
            .join(", "),
        value: "participant",
      },
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
      id: { display: "id", value: "id" },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
      },
      note: {
        display: (v: Annotation[] | undefined) =>
          v?.map((n) => n.text).join(" ") ?? "",
        value: "note",
      },
      clinicalStatus: {
        display: (v: CodeableConcept) =>
          v.coding?.map((c) => c.code).join(", ") ?? "",
        value: "clinicalStatus",
      },
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
      id: { display: "id", value: "id" },
      status: { display: "status", value: "status" },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
      },
      episodeOfCare: {
        display: (v: Reference[]) =>
          v.map((r) => getIdFromReference(r) ?? "").join(", "),
        value: "episodeOfCare",
      },
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
      id: { display: "id", value: "id" },
      status: { display: "status", value: "status" },
      patient: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "patient",
      },
      type: {
        display: (v: CodeableConcept[]) =>
          v
            .map((c) => c.coding?.map((c) => c.code).join(", ") ?? "")
            .join(", "),
        value: "type",
      },
      diagnosis: {
        display: (v: EpisodeOfCareDiagnosis[]) =>
          v
            .map((e) =>
              e.condition
                ?.map(
                  (c) => (c.reference && getIdFromReference(c.reference)) ?? "",
                )
                .join(", "),
            )
            .join(", "),
        value: "diagnosis",
      },
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
      id: { display: "id", value: "id" },
      status: { display: "status", value: "status" },
      code: {
        display: (v: CodeableConcept) =>
          v.coding?.map((c) => c.code).join(", ") ?? "",
        value: "code",
      },
      encounter: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "encounter",
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
      },
      note: {
        display: (v: Annotation[] | undefined) =>
          v?.map((n) => n.text).join(" ") ?? "",
        value: "note",
      },
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
      id: { display: "id", value: "id" },
      active: { display: (v) => JSON.stringify(v), value: "active" },
      name: { display: "name", value: "name" },
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
      id: { display: "id", value: "id" },
      birthDate: { display: "birthDate", value: "birthDate" },
      active: { display: (v) => JSON.stringify(v), value: "active" },
      gender: { display: "gender", value: "gender" },
      name: {
        display: (v) =>
          v
            ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
            .join(", "),
        value: "name",
      },
      telecom: {
        display: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
        value: "telecom",
      },
      managingOrganization: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "managingOrganization",
      },
      generalPractitioner: {
        display: (v: Reference[]) =>
          v.map((p) => getIdFromReference(p)).join(", ") ?? "",
        value: "generalPractitioner",
      },
      communication: {
        display: (v: PatientCommunication[]) =>
          v.map((p) => p.language.coding?.map((c) => c.code)).join(", ") ?? "",
        value: "communication",
      },
      address: {
        display: (v: Address[]) =>
          v
            .map(
              (a) =>
                `${a.line?.join(", ")} ${a.city} ${a.state} ${a.postalCode} ${a.country}`,
            )
            .join(", "),
        value: "address",
      },
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
      id: { display: "id", value: "id" },
      birthDate: { display: "birthDate", value: "birthDate" },
      active: { display: (v) => JSON.stringify(v), value: "active" },
      gender: { display: "gender", value: "gender" },
      name: {
        display: (v) =>
          v
            ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
            .join(", "),
        value: "name",
      },
      telecom: {
        display: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
        value: "telecom",
      },
      address: {
        display: (v: Address[]) =>
          v
            .map(
              (a) =>
                `${a.line?.join(", ")} ${a.city} ${a.state} ${a.postalCode} ${a.country}`,
            )
            .join(", "),
        value: "address",
      },
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
      id: { display: "id", value: "id" },
      active: { display: (v) => JSON.stringify(v), value: "active" },
      organization: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "organization",
      },
      practitioner: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "practitioner",
      },
    },
  },
};
