import React from "react";
import type { Filter } from "../../interfaces/Filter";

interface Props<T> {
  filterKeys: Array<keyof T>;
  filterProperties: Array<Filter<T>>;
  setFilterProperties(filterProperties: Array<Filter<T>>): void;
}

export function Filters<T>(props: Props<T>): React.JSX.Element {
  const { filterKeys, filterProperties, setFilterProperties } = props;

  function onChangeFilter(property: Filter<T>): void {
    const propertyMatch = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property &&
        filterProperty.isTruthySelected,
    );
    const fullMatch = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property &&
        filterProperty.isTruthySelected === property.isTruthySelected,
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
      {filterKeys
        .filter((k) => !!k)
        .map((key) => {
          return (
            <React.Fragment key={key.toString()}>
              <div className="flex items-center space-x-2">
                <input
                  id={`${key.toString()}-true`}
                  checked={filterProperties.some(
                    ({ property, isTruthySelected }) =>
                      property === key && isTruthySelected,
                  )}
                  type="checkbox"
                  onChange={() => {
                    onChangeFilter({
                      property: key,
                      isTruthySelected: true,
                    });
                  }}
                  className="bg-white"
                />
                <label htmlFor={`${key.toString()}-true`}>
                  {key.toString()}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id={`${key.toString()}-false`}
                  type="checkbox"
                  checked={filterProperties.some(
                    ({ property, isTruthySelected }) =>
                      property === key && !isTruthySelected,
                  )}
                  onChange={() => {
                    onChangeFilter({
                      property: key,
                      isTruthySelected: false,
                    });
                  }}
                  className="bg-white"
                />
                <label htmlFor={`${key.toString()}-false`}>
                  not {key.toString()}
                </label>
              </div>
            </React.Fragment>
          );
        })}
    </section>
  );
}
