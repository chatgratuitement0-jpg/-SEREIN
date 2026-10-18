import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEREIN — Hospitality, remembered.",
  description:
    "A considered loyalty experience for restaurants that believe exceptional hospitality is remembered.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}