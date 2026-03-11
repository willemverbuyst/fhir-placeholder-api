import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Tables</h1>
        <section>
          <Link href="/patient">Patient</Link>
        </section>
      </main>
    </div>
  );
}
