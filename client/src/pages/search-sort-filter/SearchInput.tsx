import type React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface Props {
  searchQuery: string;
  setSearchQuery(searchQuery: string): void;
}

export function SearchInput(props: Props): React.JSX.Element {
  const { setSearchQuery, searchQuery } = props;
  const [query, setQuery] = useState<string>(searchQuery);
  const debouncedQuery = useDebounce<string>(query, 250);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <section className="flex flex-col gap-2 items-start w-[350px] sm:w-[600px] lg:w-[900px]">
      <label htmlFor="sorter" className="text-xl">
        search
      </label>
      <input
        className="rounded-md border-2 border-pink-500 bg-white backdrop-blur-md p-2 font-bold text-sky-900 w-full h-[40px] outline-pink-500 focus:outline caret-pink-500"
        value={query}
        id="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(event): void => setQuery(event.target.value)}
      />
    </section>
  );
}
