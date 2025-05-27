import type React from "react";
import type { ConfigItems } from "../config/fhirResources";
import { cn } from "../lib/utils";

export function SelectResourceButton(props: {
  caption: keyof ConfigItems;
  isSelected?: boolean;
  setDisplay: (item: keyof ConfigItems) => void;
}): React.JSX.Element {
  const { caption, setDisplay, isSelected } = props;
  return (
    <button
      type="button"
      className={cn(
        "py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer font-bold transition-colors",
        isSelected ? "bg-pink-500" : "bg-sky-900",
        !isSelected && "hover:bg-sky-700",
      )}
      onClick={() => setDisplay(caption)}
    >
      {caption}
    </button>
  );
}
