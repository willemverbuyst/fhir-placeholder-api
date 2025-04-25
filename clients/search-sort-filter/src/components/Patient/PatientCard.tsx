import type { Patient } from "fhir/r5";
import type React from "react";

export function PatientCard(
  props: Patient & { id: string },
): React.JSX.Element {
  const { id, name, gender, birthDate, active } = props;

  return (
    <section className="w-[350px] bg-teal-500 text-white rounded-md p-4">
      <section className="mb-6">
        <h2 className="text-center uppercase text-xl py-2">
          {name?.map((n) => `${n.given?.join(" ")} ${n.family}`).join(", ")}
        </h2>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-semibold">gender</p>
          <p>{gender}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">birthDate</p>
          <p>{birthDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">active</p>
          <p>{JSON.stringify(active)}</p>
        </div>
      </section>
      <section className="flex justify-between mt-6">
        <p className="font-semibold">id</p>
        <p>{id}</p>
      </section>
    </section>
  );
}
