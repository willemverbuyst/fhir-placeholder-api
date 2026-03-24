import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DataTable from "@/components/DataTable";
import {
  extractSupportedResourceTypes,
  fetchCapabilityStatement,
} from "@/lib/metadata";

type ResourceTypePageProps = {
  params: Promise<{ resourceType: string }>;
};

export async function generateMetadata({
  params,
}: ResourceTypePageProps): Promise<Metadata> {
  const { resourceType } = await params;
  const capabilityStatement = await fetchCapabilityStatement();
  const supportedResourceTypes =
    extractSupportedResourceTypes(capabilityStatement);

  if (!supportedResourceTypes.includes(resourceType)) {
    return {};
  }

  return { title: resourceType };
}

export default async function ResourceTypePage({
  params,
}: ResourceTypePageProps) {
  const { resourceType } = await params;

  const capabilityStatement = await fetchCapabilityStatement();
  const supportedResourceTypes =
    extractSupportedResourceTypes(capabilityStatement);

  if (!supportedResourceTypes.includes(resourceType)) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center">{resourceType}</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable resourceType={resourceType} />
        </div>
      </section>
    </>
  );
}
