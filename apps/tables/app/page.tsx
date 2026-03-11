import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center font-sans">
      <header className="flex gap-4 p-16 sm:items-start">
        <Link href="/">Home</Link>
        <Link href="/patient">Patient</Link>
        <Link href="/episode">Episode</Link>
      </header>
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 sm:items-start">
        <h1 className="text-2xl font-bold">Tables</h1>
      </main>
    </div>
  );
}
