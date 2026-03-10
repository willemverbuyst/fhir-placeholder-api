import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold">Tables</h1>
        <section>
          <Link href="/patient">Patient</Link>
        </section>
      </main>
    </div>
  );
}
