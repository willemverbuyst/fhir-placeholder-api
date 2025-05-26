import type React from "react";
import { cn } from "../lib/utils";

export function Card({
  headerText,
  content,
  className,
}: { headerText?: string; content: React.JSX.Element; className?: string }) {
  return (
    <section
      className={cn(
        "flex flex-col gap-2 text-white p-4 rounded-md w-[350px] sm:w-[600px] lg:w-[900px] 2xl:w-[750px] bg-sky-900",
        className,
      )}
    >
      {!!headerText && (
        <h2 className="uppercase text-xl text-center">{headerText}</h2>
      )}
      <section>{content}</section>
    </section>
  );
}
