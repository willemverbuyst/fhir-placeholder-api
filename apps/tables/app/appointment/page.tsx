import DataTable from "@/components/DataTable";
import { Appointment } from "fhir/r5";

export default function AppointmentPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Appointment</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Appointment> resourceType="Appointment" />
        </div>
      </section>
    </>
  );
}

