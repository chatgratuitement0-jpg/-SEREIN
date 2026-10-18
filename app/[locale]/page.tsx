import { notFound } from "next/navigation";
import MarketingPage from "@/components/marketing";

const locales = ["en", "fr", "ar"];

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return <MarketingPage locale={locale as "en" | "fr" | "ar"} />;
}