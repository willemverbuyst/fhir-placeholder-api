import type React from "react";
import type { ConfigItems } from "../../config/fhirResources";
import { cn } from "../../lib/utils";

export function SelectResourceButton(props: {
  caption: keyof ConfigItems;
  className: string;
  setDisplay: (item: keyof ConfigItems) => void;
}): React.JSX.Element {
  const { caption, setDisplay } = props;
  return (
    <button
      type="button"
      className={cn(
        "py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer bg-pink-500 font-bold transition-colors hover:bg-sky-900",
      )}
      onClick={() => setDisplay(caption)}
    >
      {caption}
    </button>
  );
}
