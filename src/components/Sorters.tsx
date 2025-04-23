import React from "react";
import { Sorter } from "../interfaces/Sorter";

interface Props<T> {
  sortKeys: Array<keyof T>;
  setSortProperty(sortProperty: Sorter<T>): void;
}

export function Sorters<T>(props: Props<T>): React.JSX.Element {
  const { setSortProperty, sortKeys } = props;

  return (
    <p>test</p>
    // <Select
    //   onValueChange={(value) => {
    //     const [property, direction] = value.split("-") as [
    //       keyof T,
    //       "asc" | "desc",
    //     ];
    //     setSortProperty({
    //       property,
    //       isDescending: direction === "desc",
    //     });
    //   }}
    // >
    //   <SelectTrigger className="w-[180px] bg-white">
    //     <SelectValue placeholder="Sort by..." />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectGroup>
    //       {sortKeys
    //         .map((k) => String(k))
    //         .map((key) => (
    //           <React.Fragment key={key}>
    //             <SelectItem value={`${key}-asc`}>
    //               <span className="flex gap-2 items-center">
    //                 <ArrowDown size={20} /> {key}
    //               </span>
    //             </SelectItem>
    //             <SelectItem value={`${key}-desc`}>
    //               <span className="flex gap-2 items-center">
    //                 <ArrowUp size={20} /> {key}
    //               </span>
    //             </SelectItem>
    //           </React.Fragment>
    //         ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
  );
}
