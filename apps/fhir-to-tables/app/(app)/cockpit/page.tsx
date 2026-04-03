import { hasKey } from "@repo/utils";
import { notFound, redirect } from "next/navigation";
import ResourceTypeTabs from "@/components/resource-type-tabs";
import { TabsContent } from "@/components/ui/tabs";
import { FHIR_RESOURCES } from "@/config/fhir-resources";
import {
  extractSupportedResourceTypes,
  fetchCapabilityStatement,
} from "@/lib/metadata";
import { CockpitResourceCards } from "./cockpit-resource-cards";

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

type CockpitPageProps = {
  searchParams: Promise<{ "resource-type"?: string | string[] }>;
};

export default async function CockpitPage({ searchParams }: CockpitPageProps) {
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

    redirect(`/cockpit?resource-type=${defaultResourceType}`);
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
        {hasKey(FHIR_RESOURCES, selectedResourceType) && (
          <div>
            <CockpitResourceCards resourceType={selectedResourceType} />
          </div>
        )}
      </TabsContent>
    </ResourceTypeTabs>
  );
}
