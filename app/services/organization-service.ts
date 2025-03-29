import { DataStore } from "../data/index.ts";

export class OrganizationService {
  constructor(private dataStore: DataStore) {}

  getAll() {
    return this.dataStore.organizations;
  }

  getById(id: string) {
    return this.dataStore.organizations.find((c) => c.id === id);
  }
}
