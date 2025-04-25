import type { JSX } from "react";

export function List({ children }: { children: (JSX.Element | null)[] }) {
  return (
    <section>
      <ul className="flex flex-col gap-3">{children}</ul>
    </section>
  );
}
