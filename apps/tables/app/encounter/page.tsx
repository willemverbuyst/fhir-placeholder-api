import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { Encounter } from "fhir/r5";

export const metadata: Metadata = {
  title: "Encounter",
};

export default function EncounterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Encounter</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Encounter> resourceType="Encounter" />
        </div>
      </section>
    </>
  );
}

