import type React from "react";
import type { ConfigItems } from "../constants.tsx";

export function SelectResourceButton(props: {
  caption: keyof ConfigItems;
  className: string;
  setDisplay: (item: keyof ConfigItems) => void;
}): React.JSX.Element {
  const { caption, setDisplay, className } = props;
  return (
    <button
      type="button"
      className={`py-2 px-4 rounded-md text-white ${className}`}
      onClick={() => setDisplay(caption)}
    >
      {caption}
    </button>
  );
}
