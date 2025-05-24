import type { CardRows } from "../config/fhirResources";
import type { Sorter } from "../interfaces/Sorter";

export function genericSort<T>(a: T, b: T, propertyType: Sorter<T>): number {
  const { property, isDescending } = propertyType;
  const result = (): number => {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    return 0;
  };
  return isDescending ? result() * -1 : result();
}

export function getSortKeys<T>(cardRows: CardRows<T>) {
  return Object.entries(cardRows).reduce(
    (acc, [k, v]) => {
      if (v && typeof v === "object" && "sorter" in v && v.sorter) {
        acc.push(k as keyof T);
      }
      return acc;
    },
    [] as (keyof T)[],
  );
}
