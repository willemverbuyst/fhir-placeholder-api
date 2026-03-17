export const extractResources = <T>(bundle: unknown): T[] => {
  if (bundle === null || typeof bundle !== "object") {
    return [];
  }

  const maybeEntries = (bundle as { entry?: unknown }).entry;

  if (!Array.isArray(maybeEntries)) {
    return [];
  }

  const resources: T[] = [];

  for (const entry of maybeEntries) {
    if (entry === null || typeof entry !== "object") {
      continue;
    }

    const resource = (entry as { resource?: unknown }).resource;

    if (resource !== undefined) {
      resources.push(resource as T);
    }
  }

  return resources;
};

