import React from "react";
import { Items } from "../constants";

export function SelectResourceButton(props: {
  caption: keyof typeof Items;
  className: string;
  setDisplay: (item: keyof typeof Items) => void;
}): React.JSX.Element {
  const { caption, setDisplay, className } = props;
  return (
    <button
      className={`py-2 px-4 rounded-md text-white ${className}`}
      onClick={() => setDisplay(caption)}
    >
      {caption}
    </button>
  );
}
