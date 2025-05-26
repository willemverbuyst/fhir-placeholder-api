import type React from "react";
import type { Filter } from "../../interfaces/Filter";
import { Checkbox } from "../../ui/Checkbox";

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
    <section className="grid sm:grid-cols-2 gap-6 items-start w-[350px] sm:w-[600px] lg:w-[900px]">
      {(Object.entries(filterKeys) as [string, Set<string | boolean>][]).map(
        ([key, v]) => (
          <div key={key} className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-xl">{key}</h3>
            <section>
              {(Array.from(v) as string[]).sort().map((filter) => (
                <Checkbox
                  key={filter}
                  id={filter}
                  label={filter}
                  checked={filterProperties.some(
                    ({ property, value }) =>
                      property === key && filter === value,
                  )}
                  onChange={() => {
                    onChangeFilter({
                      property: key as keyof T,
                      value: filter,
                    });
                  }}
                />
              ))}
            </section>
          </div>
        ),
      )}
    </section>
  );
}
