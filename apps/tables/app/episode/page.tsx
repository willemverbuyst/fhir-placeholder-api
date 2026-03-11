import DataTable from "@/components/ui/table";
import { EpisodeOfCare } from "fhir/r5";

export default function EpisodePage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Episode of Care</h1>

        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <DataTable<EpisodeOfCare> resourceType="EpisodeOfCare" />
          </div>
        </section>
      </main>
    </div>
  );
}
