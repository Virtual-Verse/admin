import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Virtual Verse Admin",
  description: "Admin panel for the Virtual Verse educational platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* 👇 ADD THIS PROP TO THE BODY TAG */}
      <body
        className={`${nunito.variable} ${nunito.className}`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}