import type { Metadata, Viewport } from "next";

import localFont from "next/font/local";

import { Toaster } from 'react-hot-toast';
import { Suspense } from "react";

import UIProvider from "@/context/ui/ProviderUi";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Sistema de Gestión de Marcas",
  description: "Dashboard para gestión y administración de marcas registradas",
  keywords: ["marcas", "gestión", "administración", "dashboard"],
  authors: [{ name: "Sistema de Marcas" }],
  robots: "index, follow",
  openGraph: {
    title: "Sistema de Gestión de Marcas",
    description: "Dashboard para gestión y administración de marcas registradas",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-optimized`}
      >
        <ErrorBoundary>
          <UIProvider>
            <div className="w-full h-screen flex bg-slate-50">
              <SideBar />
              <main className="flex-1 h-full overflow-hidden flex flex-col">
                <Navbar />
                <div className="flex-1 overflow-y-auto">
                  <Suspense fallback={
                    <div className="flex justify-center items-center h-full">
                      <LoadingSpinner size="lg" />
                    </div>
                  }>
                    {children}
                  </Suspense>
                </div>
              </main>
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                },
              }}
            />
          </UIProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
