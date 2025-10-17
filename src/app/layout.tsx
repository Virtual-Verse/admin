import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Imports your global Tailwind CSS styles
import QueryProvider from "@/components/providers/query-provider";

// This optimizes the font loading
const inter = Inter({ subsets: ["latin"] });

// This sets the default metadata for your site (e.g., the tab title in the browser)
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
    // The `suppressHydrationWarning` is often recommended when using libraries
    // like `shadcn/ui` that might add attributes to the html tag for theming (light/dark mode).
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
