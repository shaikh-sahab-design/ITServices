import type { Metadata } from "next";
import { Bakbak_One, Inter, Geist } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const bakbak = Bakbak_One({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const geist = Geist({ subsets: ["latin"], weight: ["600"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Folio3 Managed IT & Cybersecurity Services",
  description:
    "Folio3 Managed IT delivers proactive infrastructure management, enterprise-grade security, and 24/7 expert support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bakbak.variable} ${inter.variable} ${geist.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
