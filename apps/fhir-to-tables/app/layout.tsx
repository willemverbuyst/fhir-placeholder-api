import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Json to Tables | Login",
    template: "Json to Tables | %s",
  },
  description: "Fhir JSON conversion to tables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        roboto.variable,
        "font-mono",
        geistMono.variable,
      )}
    >
      <body className="p-6">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
