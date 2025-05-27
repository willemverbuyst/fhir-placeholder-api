import { type JSX, useState } from "react";
import { cn } from "../../lib/utils";

export function ListItem({
  id,
  children,
}: {
  id: string;
  children?: JSX.Element;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <button
        type="button"
        className={cn(
          "flex justify-center p-4 rounded-md text-white w-[200px] cursor-pointer",
          zoomIn
            ? "bg-pink-500 font-bold hover:bg-pink-600"
            : "bg-sky-900 hover:bg-sky-700",
        )}
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(id);
        }}
      >
        {id}
      </button>
      {zoomIn && children ? children : null}
    </section>
  );
}
