import DataTable from "@/components/DataTable";
import { Organization } from "fhir/r5";

export default function OrganizationPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Organization</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable<Organization> resourceType="Organization" />
        </div>
      </section>
    </>
  );
}

