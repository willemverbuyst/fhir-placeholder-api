import { Bundle } from "../fhirR4/Resources/Bundle";
import { Consent } from "../fhirR4/Resources/Consent";
import { Encounter } from "../fhirR4/Resources/Encounter";
import { Flag } from "../fhirR4/Resources/Flag";
import { Group } from "../fhirR4/Resources/Group";
import { Location } from "../fhirR4/Resources/Location";
import { Organization } from "../fhirR4/Resources/Organization";
import { Patient } from "../fhirR4/Resources/Patient";
import { Person } from "../fhirR4/Resources/Person";
import { Practitioner } from "../fhirR4/Resources/Practitioner";
import { PractitionerRole } from "../fhirR4/Resources/PractitionerRole";
import { RelatedPerson } from "../fhirR4/Resources/RelatedPerson";
import { ResourceType, Resources } from "../fhirR4/resources";
import { cleanUpDisplay, createGenericErrorMessage } from "./dom";

export function parseJSONInput() {
  const input = document.getElementById("resourceInput");

  if (!(input && input instanceof HTMLTextAreaElement && input.value)) {
    console.warn("No input element found");
    return null;
  }

  try {
    const value = JSON.parse(input.value.trim());
    return value;
  } catch (error) {
    cleanUpDisplay();
    createGenericErrorMessage("Not valid JSON");
    console.error(error);
  }
}

export function parseWithZod(value: unknown, resourceType: ResourceType) {
  console.log("resourceType :>> ", resourceType);
  switch (resourceType) {
    case Resources.Bundle:
      Bundle.parse(value);
      break;
    case Resources.Consent:
      Consent.parse(value);
      break;
    case Resources.Encounter:
      Encounter.parse(value);
      break;
    case Resources.Flag:
      Flag.parse(value);
      break;
    case Resources.Group:
      Group.parse(value);
      break;
    case Resources.Location:
      Location.parse(value);
      break;
    case Resources.Organization:
      Organization.parse(value);
      break;
    case Resources.Patient:
      Patient.parse(value);
      break;
    case Resources.Person:
      Person.parse(value);
      break;
    case Resources.Practitioner:
      Practitioner.parse(value);
      break;
    case Resources.PractitionerRole:
      PractitionerRole.parse(value);
      break;
    case Resources.RelatedPerson:
      RelatedPerson.parse(value);
      break;
    default:
      throw new Error("Unhandled resource");
  }
}
