'use client';

import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import { UserProvider } from '@/context/UserContext';

import Footer from "@/components/Footer";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
      <UserProvider>
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
