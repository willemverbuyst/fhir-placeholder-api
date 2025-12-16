import { type JSX, useState } from "react";
import { cn } from "../../lib/utils";

export function ResourceItem({
  id,
  children,
}: {
  id: string;
  children?: JSX.Element | null;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <button
        type="button"
        className={cn(
          "flex justify-center p-4 rounded-md text-white w-[200px] cursor-pointer",
          zoomIn
            ? "bg-secondary font-bold hover:bg-secondary/90"
            : "bg-primary hover:bg-primary/90",
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
