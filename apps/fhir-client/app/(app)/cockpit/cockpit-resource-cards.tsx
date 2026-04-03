"use client";

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
} from "fhir/r5";
import type React from "react";
import { type AppResourceType, FHIR_RESOURCES } from "@/config/fhir-resources";
import { CardsRenderer } from "./cards-renderer";

type CockpitResourceCardsProps = {
  resourceType: AppResourceType;
};

export function CockpitResourceCards({
  resourceType,
}: CockpitResourceCardsProps): React.ReactNode {
  switch (resourceType) {
    case "Appointment":
      return <CardsRenderer<Appointment> item={FHIR_RESOURCES.Appointment} />;
    case "Condition":
      return <CardsRenderer<Condition> item={FHIR_RESOURCES.Condition} />;
    case "EpisodeOfCare":
      return (
        <CardsRenderer<EpisodeOfCare> item={FHIR_RESOURCES.EpisodeOfCare} />
      );
    case "Organization":
      return <CardsRenderer<Organization> item={FHIR_RESOURCES.Organization} />;
    case "PractitionerRole":
      return (
        <CardsRenderer<PractitionerRole>
          item={FHIR_RESOURCES.PractitionerRole}
        />
      );
    case "Practitioner":
      return <CardsRenderer<Practitioner> item={FHIR_RESOURCES.Practitioner} />;
    case "Patient":
      return <CardsRenderer<Patient> item={FHIR_RESOURCES.Patient} />;
    case "Encounter":
      return <CardsRenderer<Encounter> item={FHIR_RESOURCES.Encounter} />;
    case "Observation":
      return <CardsRenderer<Observation> item={FHIR_RESOURCES.Observation} />;
    default: {
      const _exhaustive: never = resourceType;
      return _exhaustive;
    }
  }
}
