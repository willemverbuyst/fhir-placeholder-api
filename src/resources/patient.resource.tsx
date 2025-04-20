import { BundleEntry, Patient } from "fhir/r5";
import { ListItem } from "../components/ListItem";
import { Conditions } from "./conditions.resource";

export function PatientResource({ entry }: { entry: BundleEntry<Patient> }) {
  const id = entry.resource?.id;

  if (!id) return null;

  return (
    <ListItem
      id={id}
      className="bg-teal-500"
      children={<Conditions patientId={id} />}
    />
  );
}
