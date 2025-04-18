import { BundleEntry, Organization } from "fhir/r5";
import { useState } from "react";
import { PractitionerRoles } from "./practitioner-roles.resource";

export function OrganizationResource({
  entry,
}: {
  entry: BundleEntry<Organization>;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <div
        className="bg-amber-800 py-3 px-5 rounded-md text-white w-[200px]"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <PractitionerRoles organizationId={zoomIn} /> : null}
    </section>
  );
}
