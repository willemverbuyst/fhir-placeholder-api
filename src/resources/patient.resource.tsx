import { BundleEntry, Patient } from "fhir/r5";
import { useState } from "react";
import { Episodes } from "./episodes.resource";
import { PractitionerResource } from "./practitioner.resource";

export function PatientResource({ entry }: { entry: BundleEntry<Patient> }) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  const practitionerId =
    entry.resource?.generalPractitioner?.[0].reference?.split("/")[1];

  return (
    <section className="flex gap-3">
      {zoomIn && practitionerId ? (
        <PractitionerResource practitionerId={practitionerId} />
      ) : null}
      <div
        className="bg-amber-800 p-5 rounded-md text-white"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <Episodes patientId={zoomIn} /> : null}
    </section>
  );
}
