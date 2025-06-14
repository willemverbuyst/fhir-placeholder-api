import { isString } from "@/lib/utils";
import { getIdFromReference } from "@repo/utils/fhir";
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

export type CardRows<T> = {
  [K in keyof T]?: {
    display: (
      // biome-ignore lint/suspicious/noExplicitAny: this can be any type
      v: any,
    ) => string | string[] | undefined;
    sorter?: boolean | "asc" | "desc";
    filter?: boolean;
    search?: boolean;
  };
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

export type ConfigItem<T extends Resource> = {
  resourceType: AppResourceType;
  cardRows: CardRows<T>;
};

export type ConfigItems = {
  [K in AppResourceType]: ConfigItem<
    Extract<AppFhirResource, { resourceType: K }>
  >;
};

export const FHIR_RESOURCES: ConfigItems = {
  Appointment: {
    resourceType: "Appointment",
    cardRows: {
      id: {
        display: (v: Appointment["id"]) => v,
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
          v.map((p) => p.actor && getIdFromReference(p.actor)).filter(isString),
        search: true,
      },
    },
  },
  Condition: {
    resourceType: "Condition",
    cardRows: {
      id: {
        display: (v: Condition["id"]) => v,
        search: true,
      },
      subject: {
        display: (v: Condition["subject"]) => getIdFromReference(v),
        sorter: true,
        search: true,
      },
      note: {
        display: (v: Condition["note"]) => v?.map((n) => n.text),
        sorter: "asc",
        search: true,
      },
      clinicalStatus: {
        display: (v: Condition["clinicalStatus"]) =>
          v.coding?.map((c) => c.code).filter(isString),
      },
    },
  },
  Encounter: {
    resourceType: "Encounter",
    cardRows: {
      id: {
        display: (v: Encounter["id"]) => v,
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
          v?.map((r) => getIdFromReference(r)).filter(isString),
      },
    },
  },
  EpisodeOfCare: {
    resourceType: "EpisodeOfCare",
    cardRows: {
      id: {
        display: (v: EpisodeOfCare["id"]) => v,
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
            ?.flatMap((c) => c.coding?.map((c) => c.code).filter(isString))
            .filter(isString),
        sorter: true,
      },
      diagnosis: {
        display: (v: EpisodeOfCare["diagnosis"]) =>
          v
            ?.flatMap((e) =>
              e.condition
                ?.map((c) => c.reference && getIdFromReference(c.reference))
                .filter(isString),
            )
            .filter(isString),
      },
    },
  },
  Observation: {
    resourceType: "Observation",
    cardRows: {
      id: {
        display: (v: Observation["id"]) => v,
        search: true,
      },
      status: {
        display: (v: Observation["status"]) => v,
        filter: true,
      },
      code: {
        display: (v: Observation["code"]) =>
          v.coding?.map((c) => c.code).filter(isString),
        filter: true,
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
        display: (v: Observation["note"]) => v?.map((n) => n.text),
        search: true,
      },
    },
  },
  Organization: {
    resourceType: "Organization",
    cardRows: {
      id: {
        display: (v: Organization["id"]) => v,
      },
      active: {
        display: (v: Organization["active"]) =>
          v === true ? "true" : v === false ? "false" : undefined,
        filter: true,
      },
      name: {
        display: (v: Organization["name"]) => v,
        sorter: true,
        search: true,
      },
    },
  },
  Patient: {
    resourceType: "Patient",
    cardRows: {
      id: {
        display: (v: Patient["id"]) => v,
        search: true,
      },
      birthDate: {
        display: (v: Patient["birthDate"]) => v,
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
        display: (v: Practitioner["name"]) =>
          v?.map((i) => `${i.family} ${i.given?.join(" ")}`).filter(isString),
        sorter: "asc",
        search: true,
      },
      telecom: {
        display: (v: Patient["telecom"]) =>
          v?.map((t) => t.value).filter(isString),
      },
      managingOrganization: {
        display: (v: Patient["managingOrganization"]) =>
          v && getIdFromReference(v),
        sorter: true,
        filter: true,
      },
      generalPractitioner: {
        display: (v: Patient["generalPractitioner"]) =>
          v?.map((p) => getIdFromReference(p)).filter(isString),
        sorter: true,
        filter: true,
      },
      communication: {
        display: (v: Patient["communication"]) =>
          v
            ?.flatMap((p) =>
              p.language.coding?.map((c) => c.code).filter(isString),
            )
            .filter(isString),
      },
      address: {
        display: (v: Practitioner["address"]) =>
          v
            ?.flatMap((a) => [
              `${a.line?.join(", ")} ${a.city}`,
              a.postalCode,
              a.state,
              a.country,
            ])
            .filter(isString),
        search: true,
      },
    },
  },
  Practitioner: {
    resourceType: "Practitioner",
    cardRows: {
      id: {
        display: (v: Practitioner["id"]) => v,
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
          v?.map((i) => `${i.family} ${i.given?.join(" ")}`).filter(isString),
        sorter: "asc",
        search: true,
      },
      telecom: {
        display: (v: Practitioner["telecom"]) =>
          v?.map((t) => t.value).filter(isString),
      },
      address: {
        display: (v: Practitioner["address"]) =>
          v
            ?.flatMap((a) => [
              `${a.line?.join(", ")} ${a.city}`,
              a.postalCode,
              a.state,
              a.country,
            ])
            .filter(isString),
      },
    },
  },
  PractitionerRole: {
    resourceType: "PractitionerRole",
    cardRows: {
      id: {
        display: (v: PractitionerRole["id"]) => v,
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
