import { DataStore } from "../models/data.ts";
import { seed } from "./seed.ts";

export const dataStore: DataStore = {
  patients: [],
  episodes: [],
  conditions: [],
  organizations: [],
  practitioners: [],
};

export function seedDataStore() {
  seed(dataStore);
}
