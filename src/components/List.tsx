import { JSX } from "react";

export function List({ children }: { children: JSX.Element[] }) {
  return (
    <section>
      <ul className="flex flex-col gap-3">{children}</ul>
    </section>
  );
}
