import { BundleEntry, Organization } from "fhir/r5";
import { useState } from "react";
import { Patients } from "./patients.resource";

export function OrganizationResource({
  entry,
}: {
  entry: BundleEntry<Organization>;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex">
      <div
        className="bg-amber-600 p-5 rounded-md text-white"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <Patients organizationId={zoomIn} /> : null}
    </section>
  );
}
