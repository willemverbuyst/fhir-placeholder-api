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
    let stringToSearch = "";

    if (Array.isArray(value) && value.every((i) => typeof i === "string")) {
      stringToSearch = value.join(", ");
    }

    if (typeof value === "string" || typeof value === "number") {
      stringToSearch = value.toString();
    }

    if (stringToSearch) {
      if (shouldBeCaseSensitive) {
        return stringToSearch.includes(query);
      }

      return stringToSearch.toLowerCase().includes(query.toLowerCase());
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
