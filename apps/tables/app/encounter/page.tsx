import DataTable from "@/components/DataTable";
import { Encounter } from "fhir/r5";

export default function EncounterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Encounter</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Encounter> resourceType="Encounter" />
        </div>
      </section>
    </>
  );
}

