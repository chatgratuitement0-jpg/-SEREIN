import { notFound } from "next/navigation";
import SereinApp from "@/components/serein-app";

export default async function GuestPortal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!["en", "fr", "ar"].includes(locale)) notFound();
  return <SereinApp locale={locale as "en" | "fr" | "ar"} portal="guest" />;
}