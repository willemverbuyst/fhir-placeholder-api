import type React from "react";
import type { BGColor } from "../config/fhirResources";
import { cn } from "../lib/utils";

export function Card({
  headerText,
  content,
  bgColor,
}: { headerText?: string; bgColor?: BGColor; content: React.JSX.Element }) {
  return (
    <section
      className={cn(
        "flex flex-col gap-2 text-white p-4 rounded-md",
        bgColor ?? "bg-white text-black border-2",
      )}
    >
      {!!headerText && (
        <h2 className="uppercase text-xl text-center">{headerText}</h2>
      )}
      <section>{content}</section>
    </section>
  );
}
