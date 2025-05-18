import React from "react";
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
    <section className="flex flex-col gap-2 py-4">
      {(Object.entries(filterKeys) as [string, Set<string | boolean>][]).map(
        ([key, v]) => {
          if (Array.from(v).every((i) => typeof i === "boolean")) {
            return (
              <React.Fragment key={key}>
                <div className="flex items-center space-x-2">
                  <input
                    id={key}
                    checked={filterProperties.some(
                      ({ property, value }) => property === key && value,
                    )}
                    type="checkbox"
                    onChange={() => {
                      onChangeFilter({
                        property: key as keyof T,
                        value: true,
                      });
                    }}
                    className="bg-white"
                  />
                  <label htmlFor={key}>{key}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id={`not-${key}`}
                    checked={filterProperties.some(
                      ({ property, value }) => property === key && !value,
                    )}
                    type="checkbox"
                    onChange={() => {
                      onChangeFilter({
                        property: key as keyof T,
                        value: false,
                      });
                    }}
                    className="bg-white"
                  />
                  <label htmlFor={key}>not {key}</label>
                </div>
              </React.Fragment>
            );
          }
          if (Array.from(v).every((i) => typeof i === "string")) {
            return (Array.from(v) as string[]).map((filter) => (
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
            ));
          }
        },
      )}
    </section>
  );
}
