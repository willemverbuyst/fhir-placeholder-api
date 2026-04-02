import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import DataTable from "@/components/DataTable";
import {
  extractSupportedResourceTypes,
  fetchCapabilityStatement,
} from "@/lib/metadata";

type TablesPageProps = {
  searchParams: Promise<{ "resource-type"?: string | string[] }>;
};

function getResourceTypeFromSearchParams(
  resourceType: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(resourceType)) {
    return resourceType[0];
  }

  return resourceType;
}

function getDefaultResourceType(resourceTypes: string[]): string | undefined {
  if (resourceTypes.includes("Organization")) {
    return "Organization";
  }

  return resourceTypes[0];
}

export async function generateMetadata({
  searchParams,
}: TablesPageProps): Promise<Metadata> {
  const { "resource-type": resourceTypeValue } = await searchParams;
  const selectedResourceType =
    getResourceTypeFromSearchParams(resourceTypeValue);

  if (!selectedResourceType) {
    return {};
  }

  const capabilityStatement = await fetchCapabilityStatement();
  const supportedResourceTypes =
    extractSupportedResourceTypes(capabilityStatement);

  if (!supportedResourceTypes.includes(selectedResourceType)) {
    return {};
  }

  return { title: selectedResourceType };
}

export default async function TablesPage({ searchParams }: TablesPageProps) {
  const { "resource-type": resourceTypeValue } = await searchParams;
  const selectedResourceType =
    getResourceTypeFromSearchParams(resourceTypeValue);

  const capabilityStatement = await fetchCapabilityStatement();
  const supportedResourceTypes =
    extractSupportedResourceTypes(capabilityStatement);

  if (!selectedResourceType) {
    const defaultResourceType = getDefaultResourceType(supportedResourceTypes);

    if (!defaultResourceType) {
      notFound();
    }

    redirect(`/tables?resource-type=${defaultResourceType}`);
  }

  if (!supportedResourceTypes.includes(selectedResourceType)) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center">{selectedResourceType}</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <DataTable resourceType={selectedResourceType} />
        </div>
      </section>
    </>
  );
}
