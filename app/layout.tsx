import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CustomGPT V3",
  description: "CustomGPT V3 Agentic Orchestration UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
