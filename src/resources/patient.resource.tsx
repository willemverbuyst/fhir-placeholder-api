import { BundleEntry, Patient } from "fhir/r5";
import { useState } from "react";
import { Episodes } from "./episodes.resource";

export function PatientResource({ entry }: { entry: BundleEntry<Patient> }) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex">
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
