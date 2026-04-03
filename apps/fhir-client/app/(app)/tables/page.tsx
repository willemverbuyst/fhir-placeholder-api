import DataTable from "@/components/data-table";
import ResourceTypeTabs from "@/components/resource-type-tabs";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  extractSupportedResourceTypes,
  fetchCapabilityStatement,
} from "@/lib/metadata";
import { notFound, redirect } from "next/navigation";

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
    <div className="mx-auto overflow-x-auto">
      <ResourceTypeTabs
        resourceTypes={supportedResourceTypes}
        selectedResourceType={selectedResourceType}
      >
        <Card className="bg-muted min-w-0 sm:w-full lg:w-full 2xl:w-full overflow-x-auto">
          <TabsContent value={selectedResourceType}>
            <DataTable resourceType={selectedResourceType} />
          </TabsContent>
        </Card>
      </ResourceTypeTabs>
    </div>
  );
}
