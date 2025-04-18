import { BundleEntry, Encounter } from "fhir/r5";
import { useState } from "react";
import { Observations } from "./observations.resource";

export function EncounterResource({
  entry,
}: {
  entry: BundleEntry<Encounter>;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex">
      <div
        className="bg-green-600 p-5 rounded-md text-white"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <Observations encounterId={zoomIn} /> : null}
    </section>
  );
}
