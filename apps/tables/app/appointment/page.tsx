import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { Appointment } from "fhir/r5";

export const metadata: Metadata = {
  title: "Appointment",
};

export default function AppointmentPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Appointment</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Appointment> resourceType="Appointment" />
        </div>
      </section>
    </>
  );
}

