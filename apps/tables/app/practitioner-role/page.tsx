import DataTable from "@/components/DataTable";
import { PractitionerRole } from "fhir/r5";

export default function PractitionerRolePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Practitioner Role</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<PractitionerRole> resourceType="PractitionerRole" />
        </div>
      </section>
    </>
  );
}

