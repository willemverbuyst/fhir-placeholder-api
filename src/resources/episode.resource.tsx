import { BundleEntry, EpisodeOfCare } from "fhir/r5";
import { useState } from "react";
import { Encounters } from "./encounters.resource";

export function EpisodeResource({
  entry,
}: {
  entry: BundleEntry<EpisodeOfCare>;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <div
        className="bg-blue-900 py-3 px-5 rounded-md text-white"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <Encounters episodeId={zoomIn} /> : null}
    </section>
  );
}
