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
      <main className="flex min-h-screen w-full flex-col gap-4">
        {children}
      </main>
    </AuthGuard>
  );
}
