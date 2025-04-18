import { BundleEntry, Patient } from "fhir/r5";
import { useState } from "react";
import { Conditions } from "./conditions.resource";

export function PatientResource({ entry }: { entry: BundleEntry<Patient> }) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <div
        className="bg-teal-500 py-3 px-5 rounded-md text-white w-[200px]"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <Conditions patientId={zoomIn} /> : null}
    </section>
  );
}
