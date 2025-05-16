import type { Sorter } from "../interfaces/Sorter";

export function genericSort<T>(a: T, b: T, propertyType: Sorter<T>): number {
  const { property, isDescending } = propertyType;
  const result = (): number => {
    // @ts-expect-error
    if (a[property].display > b[property].display) {
      return 1;
    }
    // @ts-expect-error
    if (a[property].display < b[property].display) {
      return -1;
    }
    return 0;
  };
  return isDescending ? result() * -1 : result();
}
