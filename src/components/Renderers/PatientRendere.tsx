import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Patient } from "fhir/r5";
import React from "react";

export function PatientRenderer(
  props: Patient & { id: string },
): React.JSX.Element {
  const { id, name, gender, birthDate } = props;

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>
          {name?.map((n) => `${n.given?.join(" ")} ${n.family}`).join(", ")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>gender: {gender} </p>
        <p>birthDate: {birthDate}</p>
      </CardContent>
      <CardFooter>id: {id}</CardFooter>
    </Card>
  );
}
