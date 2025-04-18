import { BundleEntry, EpisodeOfCare } from "fhir/r5";

export function EpisodeResource({
  entry,
}: {
  entry: BundleEntry<EpisodeOfCare>;
}) {
  return (
    <section>
      <div className="bg-blue-900 p-5 rounded-md text-white">
        {entry.resource?.id}
      </div>
    </section>
  );
}
