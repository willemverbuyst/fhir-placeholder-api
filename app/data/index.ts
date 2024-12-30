import { Data } from "../models/data.ts";
import { seed } from "./seed.ts";

export const dataStore: Data = {
  patients: [],
  episodes: [],
  conditions: [],
  organizations: [],
  practitioners: [],
};

export function seedDataStore() {
  seed(dataStore);
}
