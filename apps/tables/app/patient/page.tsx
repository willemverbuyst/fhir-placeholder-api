import DataTable from "@/components/DataTable";
import { Patient } from "fhir/r5";

export default function PatientPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Patient</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Patient> resourceType="Patient" />
        </div>
      </section>
    </>
  );
}
