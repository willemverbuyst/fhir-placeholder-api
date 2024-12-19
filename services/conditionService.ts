import { db } from "../db/index.ts";

export function getConditionFromDB(id: string) {
  return db.data.conditions.find((c) => c.id === id);
}

export function getConditionsFromDB() {
  return db.data.conditions;
}
