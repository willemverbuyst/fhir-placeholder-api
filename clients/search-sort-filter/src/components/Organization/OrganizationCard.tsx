import type { Organization } from "fhir/r5";
import type React from "react";

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
