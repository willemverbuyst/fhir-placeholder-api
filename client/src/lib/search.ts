import type { CardRows } from "../config/fhirResources";
import { typedEntries } from "./utils";

export function genericSearch<T>(
  object: T,
  properties: Array<keyof T>,
  query: string,
  shouldBeCaseSensitive = false,
): boolean {
  if (query === "") {
    return true;
  }

  return properties.some((property) => {
    const value = object[property];

    if (typeof value === "string" || typeof value === "number") {
      if (shouldBeCaseSensitive) {
        return value.toString().includes(query);
      }

      return value.toString().toLowerCase().includes(query.toLowerCase());
    }
    return false;
  });
}

export function getSearchProperties<T>(cardRows: CardRows<T>) {
  return typedEntries(cardRows).reduce(
    (acc, [k, v]) => {
      if (v?.search) {
        acc.push(k);
      }
      return acc;
    },
    [] as (keyof T)[],
  );
}
