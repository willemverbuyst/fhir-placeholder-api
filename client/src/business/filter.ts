import type { Filter } from "../interfaces/Filter";

export function genericFilter<T>(
  resource: T,
  filterProperties: Array<Filter<T>>,
): boolean {
  return filterProperties.every((filter) => {
    const key = filter.property as keyof T;

    return resource[key] === filter.value;
  });
}
