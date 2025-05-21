import type React from "react";
import type { Filter } from "../../interfaces/Filter";

interface Props<T> {
  filterKeys: Record<keyof T, Set<string | boolean>>;
  filterProperties: Array<Filter<T>>;
  setFilterProperties(filterProperties: Array<Filter<T>>): void;
}

export function Filters<T>(props: Props<T>): React.JSX.Element {
  const { filterKeys, filterProperties, setFilterProperties } = props;

  function onChangeFilter(property: Filter<T>): void {
    const propertyMatch = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property && filterProperty.value,
    );
    const fullMatch = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property &&
        filterProperty.value === property.value,
    );

    let newFilterProperties: Filter<T>[] = [];
    switch (true) {
      case fullMatch:
        newFilterProperties = filterProperties.filter(
          (filterProperty) => property.property !== filterProperty.property,
        );
        break;
      case propertyMatch:
        newFilterProperties = filterProperties.filter(
          (filterProperty) => property.property !== filterProperty.property,
        );
        newFilterProperties.push(property);
        break;
      default:
        newFilterProperties = [...filterProperties, property];
    }

    setFilterProperties(newFilterProperties);
  }

  return (
    <section className="flex flex-col gap-6 items-start w-[350px] sm:w-[600px] lg:w-[900px]">
      {(Object.entries(filterKeys) as [string, Set<string | boolean>][]).map(
        ([key, v]) => (
          <div key={key} className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-xl">{key}</h3>
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 space-x-6 sm:space-x-10">
              {(Array.from(v) as string[]).sort().map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                  <input
                    id={filter}
                    checked={filterProperties.some(
                      ({ property, value }) =>
                        property === key && filter === value,
                    )}
                    type="checkbox"
                    onChange={() => {
                      onChangeFilter({
                        property: key as keyof T,
                        value: filter,
                      });
                    }}
                    className="bg-white"
                  />
                  <label htmlFor={filter}>{filter}</label>
                </div>
              ))}
            </section>
          </div>
        ),
      )}
    </section>
  );
}
