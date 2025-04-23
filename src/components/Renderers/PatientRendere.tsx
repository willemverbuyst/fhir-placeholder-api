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
  const { id, name, gender, birthDate, active } = props;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center uppercase text-xl">
          {name?.map((n) => `${n.given?.join(" ")} ${n.family}`).join(", ")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label className="font-semibold">gender</label>
          <p>{gender}</p>
        </div>
        <div className="flex justify-between">
          <label className="font-semibold">birthDate</label>
          <p>{birthDate}</p>
        </div>
        <div className="flex justify-between">
          <label className="font-semibold">active</label>
          <p>{JSON.stringify(active)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <label className="font-semibold">id</label>
        <p>{id}</p>
      </CardFooter>
    </Card>
  );
}
