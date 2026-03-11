import DataTable from "@/components/DataTable";
import { Condition } from "fhir/r5";

export default function ConditionPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Condition</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Condition> resourceType="Condition" />
        </div>
      </section>
    </>
  );
}
