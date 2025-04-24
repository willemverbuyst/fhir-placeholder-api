import React, { useCallback, useState } from "react";
import { genericFilter } from "../business/filter";
import { genericSearch } from "../business/search";
import { genericSort } from "../business/sort";
import { Filter } from "../interfaces/Filter";
import { PropsWithChildrenFunction } from "../interfaces/PropsWithChildrenFunction";
import { Sorter } from "../interfaces/Sorter";
import { Filters } from "./Filters";
import { SearchInput } from "./SearchInput";
import { Sorters } from "./Sorters";

interface Props<T> {
  dataSource: Array<T>;
  filterKeys: Array<keyof T>;
  sortKeys: Array<keyof T>;
  searchProperties: Array<keyof T>;
  initialSortProperty: Sorter<T>;
  initialSearchQuery: string;
  initialFilterProperties: Array<Filter<T>>;
}

interface SearchSortAndFilterState<T> {
  searchQuery: string;
  sortProperty: Sorter<T>;
  filterProperties: Array<Filter<T>>;
}

export function SearchSortAndFilter<T>(
  props: PropsWithChildrenFunction<Props<T>, T>,
): React.JSX.Element {
  const {
    dataSource,
    filterKeys,
    sortKeys,
    initialFilterProperties,
    initialSearchQuery,
    initialSortProperty,
    searchProperties,
    children,
  } = props;
  const [searchSortAndFilterState, setSearchSortAndFilterState] = useState<
    SearchSortAndFilterState<T>
  >({
    searchQuery: initialSearchQuery,
    sortProperty: initialSortProperty,
    filterProperties: initialFilterProperties,
  });
  const { searchQuery, sortProperty, filterProperties } =
    searchSortAndFilterState;

  return (
    <section>
      <section className="flex flex-col gap-2">
        <SearchInput
          searchQuery={initialSearchQuery}
          setSearchQuery={useCallback(
            (searchQuery) =>
              setSearchSortAndFilterState((prev) => ({
                ...prev,
                searchQuery,
              })),
            [],
          )}
        />
        <Sorters<T>
          sortKeys={sortKeys}
          setSortProperty={(sortProperty): void => {
            setSearchSortAndFilterState({
              ...searchSortAndFilterState,
              sortProperty,
            });
          }}
        />
        <Filters<T>
          filterKeys={filterKeys}
          filterProperties={filterProperties}
          setFilterProperties={(filterProperties): void => {
            setSearchSortAndFilterState({
              ...searchSortAndFilterState,
              filterProperties,
            });
          }}
        />
      </section>

      <div className="grid grid-cols-3 gap-4">
        {children &&
          dataSource
            .filter((a) =>
              genericSearch(a, searchProperties, searchQuery, false),
            )
            .sort((a, b) => genericSort(a, b, sortProperty))
            .filter((a) => genericFilter(a, filterProperties))
            .map((d) => children(d))}
      </div>
    </section>
  );
}
