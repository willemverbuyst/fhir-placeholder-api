import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return <h1 className="text-2xl font-bold text-center">Tables</h1>;
}
