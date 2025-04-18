import { BundleEntry, Patient } from "fhir/r5";
import { useState } from "react";
import { Episodes } from "./episodes.resource";

export function PatientResource({ entry }: { entry: BundleEntry<Patient> }) {
  const [showEpisodes, setShowEpisodes] = useState<string | undefined>();

  return (
    <section className="flex">
      <div
        className="bg-amber-800 p-5 rounded-md text-white"
        onClick={() => {
          if (showEpisodes) setShowEpisodes(undefined);
          else setShowEpisodes(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {showEpisodes ? <Episodes patientId={showEpisodes} /> : null}
    </section>
  );
}
