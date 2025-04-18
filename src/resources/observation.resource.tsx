import { BundleEntry, Observation } from "fhir/r5";

export function ObservationResource({
  entry,
}: {
  entry: BundleEntry<Observation>;
}) {
  return (
    <section>
      <div className="bg-pink-600 p-5 rounded-md text-white">
        {entry.resource?.id}
      </div>
    </section>
  );
}
