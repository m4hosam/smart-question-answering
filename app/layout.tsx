import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbarUser";
const inter = Inter({ subsets: ["latin"] });
import AuthProvider from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "Soru",
  description: "Akıllı soru çözümleme platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
