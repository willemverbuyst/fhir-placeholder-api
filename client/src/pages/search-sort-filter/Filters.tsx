import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Resource } from "fhir/r5";
import type React from "react";
import type { Filter } from "../../interfaces/Filter";
import type { MappedResource } from "../../interfaces/MappedResource";

interface Props<T extends MappedResource<Resource>> {
  filterKeys: Record<keyof T, Set<string>>;
  filterProperties: Array<Filter<T>>;
  setFilterProperties(filterProperties: Array<Filter<T>>): void;
}

export function Filters<T extends MappedResource<Resource>>(
  props: Props<T>,
): React.JSX.Element {
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
      {Object.entries(filterKeys).map(([key, v]) => (
        <div key={key} className="flex flex-col gap-4 items-start w-full">
          <Label>{key}</Label>
          <section className="flex flex-col gap-2">
            {Array.from(v)
              .sort()
              .map((filter) => (
                <div key={filter} className="flex items-center gap-3">
                  <Checkbox
                    id={filter}
                    checked={filterProperties.some(
                      ({ property, value }) =>
                        property === key && filter === value,
                    )}
                    onCheckedChange={() =>
                      onChangeFilter({
                        property: key as keyof T,
                        value: filter,
                      })
                    }
                  />
                  <Label htmlFor={filter}>{filter}</Label>
                </div>
              ))}
          </section>
        </div>
      ))}
    </section>
  );
}
