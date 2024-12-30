import { dataStore } from "../data/index.ts";

export function getOrganizationFromDataStore(id: string) {
  return dataStore.organizations.find((c) => c.id === id);
}

export function getOrganizationsFromDataStore() {
  return dataStore.organizations;
}
