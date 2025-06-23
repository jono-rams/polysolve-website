import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PolySolve - The Modern Python Polynomial Solver",
  description: "A robust and high-performance library for polynomial calculus, root-finding, and arithmetic, with optional CUDA acceleration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        <Analytics />
        <Suspense fallback={null}>
          {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics />}
        </Suspense>
      </body>
    </html>
  );
}