import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logihub",
  description: "a transport website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}
