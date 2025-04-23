import { JSX, useState } from "react";

export function ListItem({
  id,
  className,
  children,
}: {
  id: string;
  className: string;
  children?: JSX.Element;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <div
        className={`py-3 px-5 rounded-md text-white w-[200px] ${className}`}
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(id);
        }}
      >
        {id}
      </div>
      {zoomIn && children ? children : null}
    </section>
  );
}
