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
import { getIdFromReference } from "../lib/fhir";

export type BGColor = `bg-${string}-${number}${number}${number}`;

export type ConfigItem<T extends Resource> = {
  resourceType: T["resourceType"];
  bgColor: BGColor;
  cardRows: Partial<
    Record<
      keyof T,
      {
        // biome-ignore lint/suspicious/noExplicitAny: <TODO>
        display: (v: any) => string;
        sorter?: boolean | "asc" | "desc";
        filter?: boolean;
        search?: boolean;
      }
    >
  >;
};

type AppFhirResource =
  | Appointment
  | Condition
  | Encounter
  | EpisodeOfCare
  | Observation
  | Organization
  | Patient
  | Practitioner
  | PractitionerRole;

export const APP_RESOURCE_TYPES: AppFhirResource["resourceType"][] = [
  "Appointment",
  "Condition",
  "Encounter",
  "EpisodeOfCare",
  "Observation",
  "Organization",
  "Patient",
  "Practitioner",
  "PractitionerRole",
] as const;

export type AppResourceType = (typeof APP_RESOURCE_TYPES)[number];

export type ConfigItems = {
  [K in AppResourceType]: ConfigItem<
    Extract<AppFhirResource, { resourceType: K }>
  >;
};

export const FHIR_RESOURCES: ConfigItems = {
  Appointment: {
    resourceType: "Appointment",
    bgColor: "bg-teal-600",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: "asc",
        search: true,
      },
      status: {
        display: (v: string) => v,
        sorter: true,
        search: true,
        filter: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
        search: true,
      },
      participant: {
        display: (v: AppointmentParticipant[]) =>
          v
            .map((p) => (p.actor && getIdFromReference(p.actor)) ?? "")
            .join(", "),
      },
    },
  },
  Condition: {
    resourceType: "Condition",
    bgColor: "bg-violet-500",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: "desc",
        search: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Annotation[] | undefined) =>
          v?.map((n) => n.text).join(" ") ?? "",
        sorter: true,
        search: true,
      },
      clinicalStatus: {
        display: (v: CodeableConcept) =>
          v.coding?.map((c) => c.code).join(", ") ?? "",
      },
    },
  },
  Encounter: {
    resourceType: "Encounter",
    bgColor: "bg-green-600",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: "desc",
        search: true,
      },
      status: {
        display: (v: string) => v,
        sorter: true,
        filter: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
        search: true,
      },
      episodeOfCare: {
        display: (v: Reference[]) =>
          v.map((r) => getIdFromReference(r) ?? "").join(", "),
      },
    },
  },
  EpisodeOfCare: {
    resourceType: "EpisodeOfCare",
    bgColor: "bg-blue-900",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: "asc",
        search: true,
      },
      status: {
        display: (v: string) => v,
        sorter: true,
        filter: true,
      },
      patient: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
        search: true,
      },
      type: {
        display: (v: CodeableConcept[]) =>
          v
            .map((c) => c.coding?.map((c) => c.code).join(", ") ?? "")
            .join(", "),
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
      },
    },
  },
  Observation: {
    resourceType: "Observation",
    bgColor: "bg-pink-600",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: true,
        search: true,
      },
      status: {
        display: (v: string) => v,
        sorter: true,
        filter: true,
      },
      code: {
        display: (v: CodeableConcept) =>
          v.coding?.map((c) => c.code).join(", ") ?? "",
        sorter: true,
      },
      encounter: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
      },
      subject: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Annotation[] | undefined) =>
          v?.map((n) => n.text).join(" ") ?? "",
        search: true,
      },
    },
  },
  Organization: {
    resourceType: "Organization",
    bgColor: "bg-amber-950",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        sorter: true,
        filter: true,
      },
      name: {
        display: (v: string) => v,
        sorter: true,
        search: true,
      },
    },
  },
  Patient: {
    resourceType: "Patient",
    bgColor: "bg-amber-400",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: true,
        search: true,
      },
      birthDate: {
        display: (v: string) => v,
        sorter: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        sorter: true,
        filter: true,
      },
      gender: {
        display: (v: string) => v,
        sorter: true,
        filter: true,
      },
      name: {
        display: (v) =>
          v
            ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
            .join(", "),
        sorter: "asc",
        search: true,
      },
      telecom: {
        display: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
      },
      managingOrganization: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
        filter: true,
      },
      generalPractitioner: {
        display: (v: Reference[]) =>
          v.map((p) => getIdFromReference(p)).join(", ") ?? "",
        sorter: true,
        filter: true,
      },
      communication: {
        display: (v: PatientCommunication[]) =>
          v.map((p) => p.language.coding?.map((c) => c.code)).join(", ") ?? "",
      },
      address: {
        display: (v: Address[]) =>
          v
            .map(
              (a) =>
                `${a.line?.join(", ")} ${a.city} ${a.state} ${a.postalCode} ${a.country}`,
            )
            .join(", "),
      },
    },
  },
  Practitioner: {
    resourceType: "Practitioner",
    bgColor: "bg-amber-600",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: true,
      },
      birthDate: {
        display: (v: string) => v,
        sorter: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        sorter: true,
        filter: true,
      },
      gender: {
        display: (v: string) => v,
        sorter: true,
        filter: true,
      },
      name: {
        display: (v) =>
          v
            ?.map((i: HumanName) => `${i.family} ${i.given?.join(" ")}`)
            .join(", "),
        sorter: "asc",
        search: true,
      },
      telecom: {
        display: (v: ContactPoint[]) => v.map((t) => t.value).join(", "),
      },
      address: {
        display: (v: Address[]) =>
          v
            .map(
              (a) =>
                `${a.line?.join(", ")} ${a.city} ${a.state} ${a.postalCode} ${a.country}`,
            )
            .join(", "),
      },
    },
  },
  PractitionerRole: {
    resourceType: "PractitionerRole",
    bgColor: "bg-amber-800",
    cardRows: {
      id: {
        display: (v: string) => v,
        sorter: true,
        search: true,
      },
      active: {
        display: (v) => JSON.stringify(v),
        sorter: true,
        filter: true,
      },
      organization: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
      },
      practitioner: {
        display: (v: Reference) => getIdFromReference(v) ?? "",
        sorter: true,
      },
    },
  },
} as const;
