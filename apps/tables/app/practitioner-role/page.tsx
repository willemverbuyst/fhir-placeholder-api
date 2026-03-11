import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { PractitionerRole } from "fhir/r5";

export const metadata: Metadata = {
  title: "Practitioner Role",
};

export default function PractitionerRolePage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Practitioner Role</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<PractitionerRole> resourceType="PractitionerRole" />
        </div>
      </section>
    </>
  );
}

