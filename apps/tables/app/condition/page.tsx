import DataTable from "@/components/ui/table";
import { Condition } from "fhir/r5";

export default function ConditionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Condition</h1>

        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <DataTable<Condition> resourceType="Condition" />
          </div>
        </section>
      </main>
    </div>
  );
}
