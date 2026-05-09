"use client";

import { useTranslations, useLocale } from "next-intl";
import { Check, Calendar, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import type { BookingState } from "./BookingFlow";
import { getService } from "@/lib/data/services";
import { CrownIcon } from "@/components/brand/Wordmark";

export function BookingSuccess({
  code,
  state,
}: {
  code: string;
  state: BookingState;
  onReset: () => void;
}) {
  const t = useTranslations("booking");
  const tBarbers = useTranslations("barbers");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const service = state.serviceId ? getService(state.serviceId) : null;

  const barberLabel =
    state.barberId === "any"
      ? t("anyBarber")
      : state.barberId
      ? tBarbers(`${state.barberId}.name`)
      : "—";

  const dateLabel = state.date
    ? state.date.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "—";

  return (
    <div className="container-x py-32 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto h-20 w-20 grid place-items-center bg-accent text-bg mb-8"
        >
          <Check className="h-10 w-10" strokeWidth={3} />
        </motion.div>

        <CrownIcon className="h-8 w-8 text-accent mx-auto mb-4" />

        <h1 className="text-5xl sm:text-6xl text-text mb-4">{t("successTitle")}</h1>
        <p className="text-muted text-lg max-w-md mx-auto mb-8">
          {t("successSubtitle")}
        </p>

        <div className="card inline-block px-8 py-4 mb-10">
          <div className="text-xs uppercase tracking-widest2 text-muted">
            {t("successCode")}
          </div>
          <div className="font-display tracking-widest2 text-2xl text-accent mt-1">
            {code}
          </div>
        </div>

        <div className="card p-6 text-left max-w-md mx-auto mb-10 space-y-2.5">
          <SummaryRow label={t("summary.barber")} value={barberLabel} />
          <SummaryRow
            label={t("summary.service")}
            value={service ? tServices(`items.${service.id}.name`) : "—"}
          />
          <SummaryRow label={t("summary.date")} value={dateLabel} />
          <SummaryRow label={t("summary.time")} value={state.time ?? "—"} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" className="btn-secondary" disabled>
            <Calendar className="h-4 w-4" />
            {t("successAddCalendar")}
          </button>
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            {t("successHome")}
          </Link>
        </div>

        <p className="mt-12 text-xs uppercase tracking-widest2 text-accent/60">
          {t("demoNote")}
        </p>
      </motion.div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs uppercase tracking-widest2 text-muted">{label}</span>
      <span className="text-text text-right">{value}</span>
    </div>
  );
}
