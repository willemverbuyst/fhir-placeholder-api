"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";

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
      <Label htmlFor="search">search</Label>
      <Input
        value={query}
        id="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(event): void => setQuery(event.target.value)}
      />
    </section>
  );
}
