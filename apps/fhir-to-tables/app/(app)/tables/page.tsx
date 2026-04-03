import { notFound, redirect } from "next/navigation";
import DataTable from "@/components/data-table";
import ResourceTypeTabs from "@/components/resource-type-tabs";
import { TabsContent } from "@/components/ui/tabs";
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
    <ResourceTypeTabs
      resourceTypes={supportedResourceTypes}
      selectedResourceType={selectedResourceType}
    >
      <TabsContent value={selectedResourceType}>
        <DataTable resourceType={selectedResourceType} />
      </TabsContent>
    </ResourceTypeTabs>
  );
}
