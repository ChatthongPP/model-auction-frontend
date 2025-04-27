// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Model Action Web",
  description: "Landing, Login, Register",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        
        {/* Header */}
        <header className=" p-4 border-b border-gray-300 bg-black shadow">
          <h2 className="text-2xl font-bold">🛒 Model Action Web</h2>
        </header>
        
        {/* Main content */}
        <main className="flex-grow p-4">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
