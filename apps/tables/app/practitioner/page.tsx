import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { Practitioner } from "fhir/r5";

export const metadata: Metadata = {
  title: "Practitioner",
};

export default function PractitionerPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Practitioner</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Practitioner> resourceType="Practitioner" />
        </div>
      </section>
    </>
  );
}
