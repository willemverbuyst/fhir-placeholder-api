import { hasKeyWithValue, isObject, typedEntries } from "@repo/utils";
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
  return typedEntries(cardRows).reduce(
    (acc, [k, v]) => {
      if (isObject(v) && hasKeyWithValue(v, "sorter") && v.sorter) {
        acc.push(k);
      }
      return acc;
    },
    [] as (keyof T)[],
  );
}

export function getInitialSortProperty<T>(cardRows: CardRows<T>) {
  const property = typedEntries(cardRows).find(
    ([_, v]) => v?.sorter === "asc" || v?.sorter === "desc",
  );

  const [k, v] = property ?? [];

  return k && v
    ? {
        property: k,
        isDescending: v.sorter === "desc",
      }
    : { property: "id" as keyof T, isDescending: false };
}
