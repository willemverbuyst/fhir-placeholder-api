import type { Filter } from "../interfaces/Filter";

export function genericFilter<T>(
  object: T,
  filterProperties: Array<Filter<T>>,
): boolean {
  return filterProperties.every((filterProperty) => {
    const { property, isTruthySelected } = filterProperty;

    // @ts-expect-error
    return isTruthySelected ? object[property].value : !object[property].value;
  });
}
