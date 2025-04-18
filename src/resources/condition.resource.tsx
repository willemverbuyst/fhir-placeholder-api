import { BundleEntry, Condition } from "fhir/r5";
import { useState } from "react";
import { Episodes } from "./episodes.resource";

export function ConditionResource({
  entry,
}: {
  entry: BundleEntry<Condition>;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <div
        className="bg-violet-500 py-3 px-5 rounded-md text-white"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(entry.resource?.id);
        }}
      >
        {entry.resource?.id}
      </div>

      {zoomIn ? <Episodes conditionId={zoomIn} /> : null}
    </section>
  );
}
