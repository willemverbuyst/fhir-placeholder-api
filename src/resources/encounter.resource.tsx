import { BundleEntry, Encounter } from "fhir/r5";
import { useState } from "react";
import { Observations } from "./observations.resource";

export function EncounterResource({
  entry,
}: {
  entry: BundleEntry<Encounter>;
}) {
  const [showObservation, setShowObservation] = useState<string | undefined>();

  return (
    <section className="flex">
      <div
        className="bg-green-600 p-5 rounded-md text-white"
        onClick={() => {
          if (showObservation) setShowObservation(undefined);
          else setShowObservation(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {showObservation ? <Observations encounterId={showObservation} /> : null}
    </section>
  );
}
