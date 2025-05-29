import type React from "react";
import { useSearchParams } from "react-router";
import type { ConfigItems } from "../config/fhirResources";
import { cn } from "../lib/utils";

export function SelectResourceButton({
  caption,
}: {
  caption: keyof ConfigItems;
}): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSelected = searchParams.get("resource") === caption;

  return (
    <button
      type="button"
      className={cn(
        "py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer font-bold transition-colors",
        isSelected ? "bg-pink-500" : "bg-sky-900",
        !isSelected && "hover:bg-sky-700",
      )}
      onClick={() => {
        setSearchParams({ resource: caption });
      }}
    >
      {caption}
    </button>
  );
}
