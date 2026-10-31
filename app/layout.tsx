import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AstraPath — AI Decision & Career Consultant (Class 11 & 12)",
  description: "Neutral analytical decision analysis for Indian higher secondary students facing career, stream, and drop dilemmas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c16] text-slate-100 antialiased selection:bg-[#e68e2e] selection:text-black">
        {children}
      </body>
    </html>
  );
}
