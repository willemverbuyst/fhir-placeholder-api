import { Resources, ResourceType } from "../fhirR4/resources";

export function getResourceType(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "resourceType" in value &&
    typeof value.resourceType === "string"
  ) {
    return (value as { resourceType: string }).resourceType;
  }

  return null;
}

export function findResourceType(value: unknown) {
  const resourceType = getResourceType(value);

  if (resourceType && resourceType in Resources) {
    return Resources[resourceType as ResourceType];
  }

  throw new Error("Unknown resource type");
}
