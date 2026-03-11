"use client";

import Link from "next/link";
import PatientDataTable from "./patientDataTable";

export default function PatientPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Patient</h1>
        <section>
          <Link href="/">Home</Link>
        </section>

        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <PatientDataTable />
          </div>
        </section>
      </main>
    </div>
  );
}
