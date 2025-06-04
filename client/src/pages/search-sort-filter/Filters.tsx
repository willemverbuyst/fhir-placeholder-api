import { Label } from "@/components/ui/label";
import type { Resource } from "fhir/r5";
import React from "react";
import type { Filter } from "../../interfaces/Filter";
import type { MappedResource } from "../../interfaces/MappedResource";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <section className="flex flex-col gap-2 items-start w-[350px] sm:w-[600px] lg:w-[900px]">
      <Label>Filter</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full flex justify-baseline">
          <Button
            variant="outline"
            className="text-muted-foreground font-light"
          >
            filter by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {Object.entries(filterKeys).map(([key, v]) => (
            <React.Fragment key={key}>
              <DropdownMenuLabel>{key}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {Array.from(v)
                .sort()
                .map((filter) => (
                  <DropdownMenuCheckboxItem
                    key={filter}
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
                  >
                    {filter}
                  </DropdownMenuCheckboxItem>
                ))}
              <DropdownMenuSeparator />
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
