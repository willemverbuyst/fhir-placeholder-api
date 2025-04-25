import React from "react";
import type { Sorter } from "../interfaces/Sorter";

interface Props<T> {
  sortKeys: Array<keyof T>;
  setSortProperty(sortProperty: Sorter<T>): void;
}

export function Sorters<T>(props: Props<T>): React.JSX.Element {
  const { setSortProperty, sortKeys } = props;

  return (
    <form className="text-black w-[200px]">
      <label htmlFor="sorter" className="block mb-2 text-sm font-medium">
        Sort by
      </label>
      <select
        id="sorter"
        className="border text-sm rounded-lg px-5 py-2"
        onChange={(e) => {
          const [property, direction] = e.target?.value?.split("-") as [
            keyof T,
            "asc" | "desc",
          ];
          setSortProperty({
            property,
            isDescending: direction === "desc",
          });
        }}
      >
        {sortKeys
          .map((k) => String(k))
          .map((key) => (
            <React.Fragment key={key}>
              <option value={`${key}-asc`}>{key} asc</option>
              <option value={`${key}-desc`}>{key} desc</option>
            </React.Fragment>
          ))}
      </select>
    </form>
  );
}
