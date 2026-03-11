import DataTable from "@/components/DataTable";
import { AllergyIntolerance } from "fhir/r5";

export default function AllergyIntolerancePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Allergy Intolerance</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<AllergyIntolerance> resourceType="AllergyIntolerance" />
        </div>
      </section>
    </>
  );
}

