import { BundleEntry, Observation } from "fhir/r5";

export function ObservationResource({
  entry,
}: {
  entry: BundleEntry<Observation>;
}) {
  return (
    <section className="flex gap-3">
      <div className="bg-pink-600 py-3 px-5 rounded-md text-white w-[200px]">
        {entry.resource?.id}
      </div>
    </section>
  );
}
