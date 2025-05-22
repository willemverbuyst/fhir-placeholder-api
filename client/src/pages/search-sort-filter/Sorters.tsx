import React from "react";
import type { Sorter } from "../../interfaces/Sorter";

interface Props<T> {
  sortKeys: Array<keyof T>;
  setSortProperty(sortProperty: Sorter<T>): void;
}

export function Sorters<T>(props: Props<T>): React.JSX.Element {
  const { setSortProperty, sortKeys } = props;

  return (
    <section className="flex flex-col gap-2 items-start w-[350px] sm:w-[600px] lg:w-[900px]">
      <label htmlFor="sorter" className="text-xl ">
        sort by
      </label>
      <select
        id="sorter"
        className="border-2 text-sm rounded-lg px-5 py-2 bg-white text-black h-[40px] w-full"
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
    </section>
  );
}
