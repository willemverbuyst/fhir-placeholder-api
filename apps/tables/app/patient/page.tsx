"use client";

import Link from "next/link";
import { useState } from "react";
import Example1 from "./example1";
import Example2 from "./example2";
import Example3 from "./example3";
import Example4 from "./example4";

export default function PatientPage() {
  const [view, setView] = useState<
    "example1" | "example2" | "example3" | "example4"
  >("example4");

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Patient</h1>
        <section>
          <Link href="/">Home</Link>
        </section>
        <section>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView("example1")}
              className="px-4 py-2 rounded bg-slate-800 text-zinc-200 border border-zinc-600 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Example 1
            </button>
            <button
              type="button"
              onClick={() => setView("example2")}
              className="px-4 py-2 rounded bg-slate-800 text-zinc-200 border border-zinc-600 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Example 2
            </button>
            <button
              type="button"
              onClick={() => setView("example3")}
              className="px-4 py-2 rounded bg-slate-800 text-zinc-200 border border-zinc-600 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Example 3
            </button>
            <button
              type="button"
              onClick={() => setView("example4")}
              className="px-4 py-2 rounded bg-slate-800 text-zinc-200 border border-zinc-600 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Example 4
            </button>
          </div>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            {view === "example1" && <Example1 />}
            {view === "example2" && <Example2 />}
            {view === "example3" && <Example3 />}
            {view === "example4" && <Example4 />}
          </div>
        </section>
      </main>
    </div>
  );
}
