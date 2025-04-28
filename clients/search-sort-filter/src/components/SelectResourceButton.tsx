import type React from "react";
import type { ResourceType } from "../constants";

export function SelectResourceButton(props: {
  caption: ResourceType;
  className: string;
  setDisplay: (item: ResourceType) => void;
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
