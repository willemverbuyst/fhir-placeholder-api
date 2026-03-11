import Link from "next/link";
import Example1 from "./example1";
import Example2 from "./example2";
import Example3 from "./example3";
import Example4 from "./example4";

export default function PatientPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Patient</h1>
        <section>
          <Link href="/">Home</Link>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <Example1 />
          </div>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <Example2 />
          </div>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <Example3 />
          </div>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <Example4 />
          </div>
        </section>
      </main>
    </div>
  );
}
