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
      <main className="w-screen grid items-center overflow-auto">
        {children}
      </main>
    </AuthGuard>
  );
}
