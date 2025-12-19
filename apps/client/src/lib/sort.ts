import { hasKeyWithValue, isPlainObject, typedEntries } from "@repo/utils";
import type { CardRows } from "../config/fhirResources";
import type { Sorter } from "../interfaces/Sorter";

export function isId(a: unknown): a is string {
  return typeof a === "string" && /^([a-z]+-)+\d+$/.test(a);
}

export function getNumericValueFromId(a: unknown) {
  if (!isId(a)) {
    throw Error("unexpected id format");
  }
  const match = a.match(/\d+/);

  if (!match?.length) {
    throw Error("unexpected id format");
  }
  return Number(match[0]);
}

export function getSortResult<T>(a: T, b: T) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

export function genericSort<T>(a: T, b: T, propertyType: Sorter<T>): number {
  const { property, isDescending } = propertyType;

  let result: 1 | -1 | 0 = 0;

  const aValue = a[property];
  const bValue = b[property];
  if (property === "id") {
    result = getSortResult(
      getNumericValueFromId(aValue),
      getNumericValueFromId(bValue)
    );
  } else {
    result = getSortResult(aValue, bValue);
  }

  return isDescending ? result * -1 : result;
}

export function getSortKeys<T>(cardRows: CardRows<T>) {
  return typedEntries(cardRows).reduce((acc, [k, v]) => {
    if (isPlainObject(v) && hasKeyWithValue(v, "sorter") && v.sorter) {
      acc.push(k);
    }
    return acc;
  }, [] as (keyof T)[]);
}

export function getInitialSortProperty<T>(cardRows: CardRows<T>) {
  const property = typedEntries(cardRows).find(
    ([_, v]) => v?.sorter === "asc" || v?.sorter === "desc"
  );

  const [k, v] = property ?? [];

  return k && v
    ? {
        property: k,
        isDescending: v.sorter === "desc",
      }
    : { property: "id" as keyof T, isDescending: false };
}
