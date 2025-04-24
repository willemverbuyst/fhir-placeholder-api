import { Organization } from "fhir/r5";
import React from "react";

export function OrganizationCard(
  props: Organization & { id: string },
): React.JSX.Element {
  const { id, name, active } = props;

  return (
    <section className="w-[350px] bg-amber-800 text-white rounded-md p-4">
      <section className="mb-6">
        <h2 className="text-center uppercase text-xl py-2">{name}</h2>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label className="font-semibold">active</label>
          <p>{JSON.stringify(active)}</p>
        </div>
      </section>
      <section className="flex justify-between mt-6">
        <label className="font-semibold">id</label>
        <p>{id}</p>
      </section>
    </section>
  );
}
