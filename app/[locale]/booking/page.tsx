import { setRequestLocale } from "next-intl/server";
import { BookingFlow } from "@/components/booking/BookingFlow";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookingFlow />;
}
