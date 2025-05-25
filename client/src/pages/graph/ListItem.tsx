import { type JSX, useState } from "react";

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
        className={
          "flex justify-center p-4 rounded-md text-white w-[200px] bg-sky-900 hover:bg-sky-700 cursor-pointer"
        }
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
