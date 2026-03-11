import type { Metadata } from "next";
import DataTable from "@/components/DataTable";
import { EpisodeOfCare } from "fhir/r5";

export const metadata: Metadata = {
  title: "Episode of Care",
};

export default function EpisodePage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Episode of Care</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<EpisodeOfCare> resourceType="EpisodeOfCare" />
        </div>
      </section>
    </>
  );
}
