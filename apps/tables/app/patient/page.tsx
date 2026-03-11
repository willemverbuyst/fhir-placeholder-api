import type { Metadata } from "next";
import { Suspense } from "react";
import DataTable from "@/components/DataTable";
import { Patient } from "fhir/r5";
import LoadingOverlay from "@/components/LoadingOverlay";

export const metadata: Metadata = {
  title: "Patient",
};

export default function PatientPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Patient</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <Suspense
            fallback={
              <LoadingOverlay mode="inline" label="Loading patient resources…" />
            }
          >
            <DataTable<Patient> resourceType="Patient" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
