import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

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
    <input
      className="bg-white border-2 rounded-md p-2"
      value={query}
      id="search"
      placeholder="Search..."
      aria-label="Search"
      onChange={(event): void => setQuery(event.target.value)}
    />
  );
}
