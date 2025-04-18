import { BundleEntry, EpisodeOfCare } from "fhir/r5";
import { useState } from "react";
import { Encounters } from "./encounters.resource";

export function EpisodeResource({
  entry,
}: {
  entry: BundleEntry<EpisodeOfCare>;
}) {
  const [showEncounter, setShowEncounter] = useState<string | undefined>();

  return (
    <section className="flex">
      <div
        className="bg-blue-900 p-5 rounded-md text-white"
        onClick={() => {
          if (showEncounter) setShowEncounter(undefined);
          else setShowEncounter(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {showEncounter ? <Encounters episodeId={showEncounter} /> : null}
    </section>
  );
}
