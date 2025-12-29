import { Resource } from "fhir/r5";
import { type JSX, useState } from "react";
import { cn } from "../../lib/utils";

export function ResourceItem({
  id,
  resourceType,
  children,
}: {
  id: string;
  resourceType: Resource["resourceType"];
  children?: JSX.Element | null;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <button
        type="button"
        className={cn(
          "flex flex-col items-center p-4 rounded-md w-[350px] text-white cursor-pointer",
          zoomIn
            ? "bg-secondary font-bold hover:bg-secondary/90"
            : "bg-primary hover:bg-primary/90",
        )}
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(id);
        }}
      >
        <span>{resourceType}</span>
        <span className="text-xs">{id}</span>
      </button>
      {zoomIn && children ? children : null}
    </section>
  );
}
