import AuthGuard from "@/components/AuthGuard";
import { Header } from "@/components/header/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Header />
      <main className="justify-self-center w-full max-w-[min(100%,2560px)] p-4">
        {children}
      </main>
    </AuthGuard>
  );
}
