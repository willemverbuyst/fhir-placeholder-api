import { Data } from "../models/data.ts";
import { seed } from "./seed.ts";

export const dataStore: Data = { patients: [], episodes: [], conditions: [] };

export function seedDataStore() {
  seed(dataStore);
}
