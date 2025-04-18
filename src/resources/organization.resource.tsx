import { BundleEntry, Organization } from "fhir/r5";
import { useState } from "react";
import { Patients } from "./patients.resource";

export function OrganizationResource({
  entry,
}: {
  entry: BundleEntry<Organization>;
}) {
  const [showPatients, setShowPatients] = useState<undefined | string>();

  return (
    <section className="flex">
      <div
        className="bg-amber-600 p-5 rounded-md text-white"
        onClick={() => {
          if (showPatients) setShowPatients(undefined);
          else setShowPatients(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {showPatients ? <Patients organizationId={showPatients} /> : null}
    </section>
  );
}
