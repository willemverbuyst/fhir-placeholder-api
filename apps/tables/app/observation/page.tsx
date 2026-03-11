import DataTable from "@/components/DataTable";
import { Observation } from "fhir/r5";

export default function ObservationPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Observation</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Observation> resourceType="Observation" />
        </div>
      </section>
    </>
  );
}

