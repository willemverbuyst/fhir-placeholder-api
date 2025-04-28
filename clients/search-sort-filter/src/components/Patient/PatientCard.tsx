import type { Patient } from "fhir/r5";
import type React from "react";
import { Card } from "../Card";

export function PatientCard(
  props: Patient & { id: string },
): React.JSX.Element {
  const { id, name, active, birthDate, gender } = props;

  return (
    <Card<Patient>
      title={name?.map((n) => `${n.given?.join(" ")} ${n.family}`).join(", ")}
      labelsAndValues={
        new Map([
          ["id", id],
          ["birthDate", birthDate],
          ["gender", gender],
          ["active", JSON.stringify(active)],
        ])
      }
    />
  );
}
