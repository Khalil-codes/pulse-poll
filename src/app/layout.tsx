import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import { DEFAULT_DESCRIPTION } from "@/lib/constants";
import { getURL } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: "PulseVote | Vote on the go",
  description: DEFAULT_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} container mx-auto flex min-h-screen flex-col gap-5 bg-background px-6 pt-10 text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex flex-1 flex-col pr-2 md:p-0">{children}</main>
          <Toaster richColors invert />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
