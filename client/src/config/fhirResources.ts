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
import { getIdFromReference } from "../lib/fhir";

export type BGColor = `bg-${string}-${number}${number}${number}`;

export type ConfigItem<T extends Resource> = {
  resourceType: T["resourceType"];
  bgColor: BGColor;
  cardRows: Partial<
    Record<
      keyof T,
      {
        // biome-ignore lint/suspicious/noExplicitAny: this can be any type
        display: (v: any) => string | undefined;
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
        display: (v: Appointment["id"]) => v,
        sorter: "asc",
        search: true,
      },
      status: {
        display: (v: Appointment["status"]) => v,
        sorter: true,
        search: true,
        filter: true,
      },
      subject: {
        display: (v: Appointment["subject"]) => v && getIdFromReference(v),
        sorter: true,
        search: true,
      },
      participant: {
        display: (v: Appointment["participant"]) =>
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
        display: (v: Condition["id"]) => v,
        sorter: "desc",
        search: true,
      },
      subject: {
        display: (v: Condition["subject"]) => getIdFromReference(v),
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Condition["note"]) => v?.map((n) => n.text).join(" "),
        sorter: true,
        search: true,
      },
      clinicalStatus: {
        display: (v: Condition["clinicalStatus"]) =>
          v.coding?.map((c) => c.code).join(", "),
      },
    },
  },
  Encounter: {
    resourceType: "Encounter",
    bgColor: "bg-green-600",
    cardRows: {
      id: {
        display: (v: Encounter["id"]) => v,
        sorter: "desc",
        search: true,
      },
      status: {
        display: (v: Encounter["status"]) => v,
        sorter: true,
        filter: true,
      },
      subject: {
        display: (v: Encounter["subject"]) => v && getIdFromReference(v),
        sorter: true,
        search: true,
      },
      episodeOfCare: {
        display: (v: Encounter["episodeOfCare"]) =>
          (v?.map((r) => getIdFromReference(r) ?? "") ?? []).join(", "),
      },
    },
  },
  EpisodeOfCare: {
    resourceType: "EpisodeOfCare",
    bgColor: "bg-blue-900",
    cardRows: {
      id: {
        display: (v: EpisodeOfCare["id"]) => v,
        sorter: "asc",
        search: true,
      },
      status: {
        display: (v: EpisodeOfCare["status"]) => v,
        sorter: true,
        filter: true,
      },
      patient: {
        display: (v: EpisodeOfCare["patient"]) => getIdFromReference(v),
        sorter: true,
        search: true,
      },
      type: {
        display: (v: EpisodeOfCare["type"]) =>
          v
            ?.map((c) => c.coding?.map((c) => c.code).join(", ") ?? "")
            .join(", "),
        sorter: true,
      },
      diagnosis: {
        display: (v: EpisodeOfCare["diagnosis"]) =>
          v
            ?.map((e) =>
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
        display: (v: Observation["id"]) => v,
        sorter: true,
        search: true,
      },
      status: {
        display: (v: Observation["status"]) => v,
        sorter: true,
        filter: true,
      },
      code: {
        display: (v: Observation["code"]) =>
          v.coding?.map((c) => c.code).join(", "),
        sorter: true,
      },
      encounter: {
        display: (v: Observation["encounter"]) => v && getIdFromReference(v),
        sorter: true,
      },
      subject: {
        display: (v: Observation["subject"]) => v && getIdFromReference(v),
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Observation["note"]) => v?.map((n) => n.text).join(" "),
        search: true,
      },
    },
  },
  Organization: {
    resourceType: "Organization",
    bgColor: "bg-amber-950",
    cardRows: {
      id: {
        display: (v: Organization["id"]) => v,
        sorter: true,
      },
      active: {
        display: (v: Organization["active"]) =>
          v === true ? "true" : v === false ? "false" : undefined,
        sorter: true,
        filter: true,
      },
      name: {
        display: (v: Organization["name"]) => v ?? "",
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
        display: (v: Patient["id"]) => v ?? "",
        sorter: true,
        search: true,
      },
      birthDate: {
        display: (v: Patient["birthDate"]) => v ?? "",
        sorter: true,
      },
      active: {
        display: (v: Patient["active"]) =>
          v === true ? "true" : v === false ? "false" : undefined,
        sorter: true,
        filter: true,
      },
      gender: {
        display: (v: Patient["gender"]) => v,
        sorter: true,
        filter: true,
      },
      name: {
        display: (v: Patient["name"]) =>
          v?.map((i) => `${i.family} ${i.given?.join(" ")}`).join(", "),
        sorter: "asc",
        search: true,
      },
      telecom: {
        display: (v: Patient["telecom"]) => v?.map((t) => t.value).join(", "),
      },
      managingOrganization: {
        display: (v: Patient["managingOrganization"]) =>
          v && getIdFromReference(v),
        sorter: true,
        filter: true,
      },
      generalPractitioner: {
        display: (v: Patient["generalPractitioner"]) =>
          v?.map((p) => getIdFromReference(p)).join(", "),
        sorter: true,
        filter: true,
      },
      communication: {
        display: (v: Patient["communication"]) =>
          v?.map((p) => p.language.coding?.map((c) => c.code)).join(", "),
      },
      address: {
        display: (v: Patient["address"]) =>
          v
            ?.map(
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
        display: (v: Practitioner["id"]) => v ?? "missing id",
        sorter: true,
      },
      birthDate: {
        display: (v: Practitioner["birthDate"]) => v,
        sorter: true,
      },
      active: {
        display: (v: Practitioner["active"]) =>
          v === true ? "true" : v === false ? "false" : undefined,
        sorter: true,
        filter: true,
      },
      gender: {
        display: (v: Practitioner["gender"]) => v,
        sorter: true,
        filter: true,
      },
      name: {
        display: (v: Practitioner["name"]) =>
          v?.map((i) => `${i.family} ${i.given?.join(" ")}`).join(", "),
        sorter: "asc",
        search: true,
      },
      telecom: {
        display: (v: Practitioner["telecom"]) =>
          v?.map((t) => t.value).join(", "),
      },
      address: {
        display: (v: Practitioner["address"]) =>
          v
            ?.map(
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
        display: (v: PractitionerRole["id"]) => v ?? "missing id",
        sorter: true,
        search: true,
      },
      active: {
        display: (v: PractitionerRole["active"]) =>
          v === true ? "true" : v === false ? "false" : undefined,
        sorter: true,
        filter: true,
      },
      organization: {
        display: (v: PractitionerRole["organization"]) =>
          v && getIdFromReference(v),
        sorter: true,
      },
      practitioner: {
        display: (v: PractitionerRole["practitioner"]) =>
          v && getIdFromReference(v),
        sorter: true,
      },
    },
  },
} as const;
