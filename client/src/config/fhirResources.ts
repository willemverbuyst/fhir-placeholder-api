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
  initialSortProperty: Sorter<MappedResource<T>>;
  initialFilterProperties: Filter<MappedResource<T>>[];
  initialSearchQuery: "";
  cardRows: Partial<
    Record<
      keyof T,
      {
        // biome-ignore lint/suspicious/noExplicitAny: <TODO>
        display: (v: any) => string;
        value: keyof T;
        sorter?: boolean;
        filter?: boolean;
        search?: boolean;
      }
    >
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      status: {
        display: (v: string) => v,
        value: "status",
        sorter: true,
        search: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
        sorter: true,
        search: true,
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Annotation[] | undefined) =>
          v?.map((n) => n.text).join(" ") ?? "",
        value: "note",
        sorter: true,
        search: true,
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      status: { display: (v: string) => v, value: "status", sorter: true },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
        sorter: true,
        search: true,
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      status: { display: (v: string) => v, value: "status", sorter: true },
      patient: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "patient",
        sorter: true,
        search: true,
      },
      type: {
        display: (v: CodeableConcept[]) =>
          v
            .map((c) => c.coding?.map((c) => c.code).join(", ") ?? "")
            .join(", "),
        value: "type",
        sorter: true,
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      status: { display: (v: string) => v, value: "status", sorter: true },
      code: {
        display: (v: CodeableConcept) =>
          v.coding?.map((c) => c.code).join(", ") ?? "",
        value: "code",
        sorter: true,
      },
      encounter: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "encounter",
        sorter: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "subject",
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Annotation[] | undefined) =>
          v?.map((n) => n.text).join(" ") ?? "",
        value: "note",
        search: true,
      },
    },
  },
  Organization: {
    resourceType: "Organization",
    bgColor: "bg-amber-950",
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: { display: (v: string) => v, value: "id", sorter: true },
      active: {
        display: (v) => JSON.stringify(v),
        value: "active",
        sorter: true,
        filter: true,
      },
      name: {
        display: (v: string) => v,
        value: "name",
        sorter: true,
        search: true,
      },
    },
  },
  Patient: {
    resourceType: "Patient",
    bgColor: "bg-amber-400",
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      birthDate: {
        display: (v: string) => v,
        value: "birthDate",
        sorter: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        value: "active",
        sorter: true,
        filter: true,
      },
      gender: { display: (v: string) => v, value: "gender", sorter: true },
      name: {
        display: (v) =>
          v
            ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
            .join(", "),
        value: "name",
        sorter: true,
        search: true,
      },
      telecom: {
        display: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
        value: "telecom",
      },
      managingOrganization: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "managingOrganization",
        sorter: true,
      },
      generalPractitioner: {
        display: (v: Reference[]) =>
          v.map((p) => getIdFromReference(p)).join(", ") ?? "",
        value: "generalPractitioner",
        sorter: true,
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: { display: (v: string) => v, value: "id", sorter: true },
      birthDate: {
        display: (v: string) => v,
        value: "birthDate",
        sorter: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        value: "active",
        sorter: true,
        filter: true,
      },
      gender: { display: (v: string) => v, value: "gender", sorter: true },
      name: {
        display: (v) =>
          v
            ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
            .join(", "),
        value: "name",
        sorter: true,
        search: true,
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
    initialSortProperty: {
      property: "id",
      isDescending: true,
    },
    initialFilterProperties: [],
    initialSearchQuery: "",
    cardRows: {
      id: {
        display: (v: string) => v,
        value: "id",
        sorter: true,
        search: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        value: "active",
        sorter: true,
        filter: true,
      },
      organization: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "organization",
        sorter: true,
      },
      practitioner: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        value: "practitioner",
        sorter: true,
      },
    },
  },
};
