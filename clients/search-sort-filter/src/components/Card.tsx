import type React from "react";

export function Card<T>({
  title,
  labelsAndValues,
}: {
  title: string | undefined;
  labelsAndValues: Map<keyof T, string | undefined>;
}): React.JSX.Element {
  return (
    <section className="w-[350px] bg-teal-500 text-white rounded-md p-4">
      <section className="mb-6">
        <h2 className="text-center uppercase text-xl py-2">{title}</h2>
      </section>
      <section className="flex flex-col gap-2">
        {Array.from(labelsAndValues).map(([l, v]) => {
          return (
            <div key={String(l)} className="flex justify-between">
              <p className="font-semibold">{String(l)}</p>
              <p>{v}</p>
            </div>
          );
        })}
      </section>
    </section>
  );
}
