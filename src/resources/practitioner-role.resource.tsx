import { BundleEntry, PractitionerRole } from "fhir/r5";
import { useState } from "react";
import { PractitionerResource } from "./practitioner.resource";

export function PractitionerRoleResource({
  entry,
}: {
  entry: BundleEntry<PractitionerRole>;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();
  const practitionerId = entry.resource?.practitioner?.reference?.split("/")[1];

  return (
    <section className="flex gap-3">
      <div
        className="bg-amber-600 py-3 px-5 rounded-md text-white w-[200px]"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn && practitionerId ? (
        <PractitionerResource practitionerId={practitionerId} />
      ) : null}
    </section>
  );
}
