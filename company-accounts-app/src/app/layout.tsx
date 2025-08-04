import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Company Accounts Management System",
  description: "Professional financial accounts management application for tracking company capital, assets, liabilities, and generating financial reports.",
  keywords: ["finance", "accounting", "company accounts", "financial management", "equity tracking"],
  authors: [{ name: "Financial Systems" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Company Accounts Management System",
    description: "Professional financial accounts management application",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
