import Providers from "@/lib/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Tutor",
  description: "Created by Rasel Miah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" className={`${inter.className}`}>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
