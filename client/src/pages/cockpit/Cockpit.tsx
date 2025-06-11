import type { Resource } from "fhir/r5";
import type React from "react";
import { useCallback, useState } from "react";
import type { Filter } from "../../interfaces/Filter";
import type { MappedResource } from "../../interfaces/MappedResource";
import type { PropsWithChildrenFunction } from "../../interfaces/PropsWithChildrenFunction";
import type { Sorter } from "../../interfaces/Sorter";
import { genericFilter } from "../../lib/filter";
import { genericSearch } from "../../lib/search";
import { genericSort } from "../../lib/sort";
import { AddResourceButton } from "./AddResourceButton";
import { Filters } from "./Filters";
import { FormMap } from "./FormMap";
import { SearchInput } from "./SearchInput";
import { Sorters } from "./Sorters";
import { useFormStore } from "./useFormStore";

interface Props<T extends MappedResource<Resource>> {
  dataSource: Array<T>;
  filterKeys: Record<keyof T, Set<string>>;
  sortKeys: Array<keyof T>;
  searchProperties: Array<keyof T>;
  initialSortProperty: Sorter<T>;
}

interface SearchSortAndFilterState<T> {
  searchQuery: string;
  sortProperty: Sorter<T>;
  filterProperties: Array<Filter<T>>;
}

export function Cockpit<T extends MappedResource<Resource>>(
  props: PropsWithChildrenFunction<Props<T>, T>,
): React.JSX.Element {
  const {
    dataSource,
    filterKeys,
    sortKeys,
    initialSortProperty,
    searchProperties,
    children,
  } = props;
  const { resourceForm } = useFormStore();
  const [searchSortAndFilterState, setSearchSortAndFilterState] = useState<
    SearchSortAndFilterState<T>
  >({
    searchQuery: "",
    sortProperty: initialSortProperty,
    filterProperties: [],
  });
  const { searchQuery, sortProperty, filterProperties } =
    searchSortAndFilterState;

  return (
    <section className="flex flex-col gap-6 items-center pb-10">
      <section className="flex gap-2 w-[800px] items-end">
        <SearchInput
          searchQuery={""}
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
        <AddResourceButton />
      </section>
      {resourceForm && FormMap[resourceForm]}

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
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
