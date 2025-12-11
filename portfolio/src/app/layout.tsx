import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nguyễn Quốc Huy (Leo) - AI Researcher & Deep Learning Engineer",
  description: "Portfolio của Nguyễn Quốc Huy - Nhà nghiên cứu AI và kỹ sư học sâu chuyên về phân tích hình ảnh y tế",
  keywords: "AI, Machine Learning, Deep Learning, Computer Vision, Medical Imaging, Portfolio",
  authors: [{ name: "Nguyễn Quốc Huy" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navbar />
            <main className="relative pt-20">
              {children}
            </main>
            <ScrollToTopButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
