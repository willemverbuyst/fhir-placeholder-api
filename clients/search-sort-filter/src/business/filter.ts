import { Filter } from "../interfaces/Filter";

export function genericFilter<T>(
  object: T,
  filterProperties: Array<Filter<T>>,
): boolean {
  return filterProperties.every((filterProperty) => {
    const { property, isTruthySelected } = filterProperty;
    return isTruthySelected ? object[property] : !object[property];
  });
}
