import { BundleEntry, Encounter } from "fhir/r5";

export function EncounterResource({
  entry,
}: {
  entry: BundleEntry<Encounter>;
}) {
  return (
    <section>
      <div className="bg-green-600 p-5 rounded-md text-white">
        {entry.resource?.id}
      </div>
    </section>
  );
}
