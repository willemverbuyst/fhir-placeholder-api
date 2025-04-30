import type { Organization, Patient, Practitioner } from "fhir/r5";
import type React from "react";
import { CardsRenderer } from "../components/CardsRenderer";
import { CONFIG_ITEMS, type ConfigItems } from "../constants";

export const ItemMap: Record<keyof ConfigItems, React.JSX.Element> = {
  Patient: <CardsRenderer<Patient> {...CONFIG_ITEMS.Patient} />,
  Practitioner: <CardsRenderer<Practitioner> {...CONFIG_ITEMS.Practitioner} />,
  Organization: <CardsRenderer<Organization> {...CONFIG_ITEMS.Organization} />,
};
