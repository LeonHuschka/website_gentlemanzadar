"use client";

import { useTranslations, useLocale } from "next-intl";
import { Pencil } from "lucide-react";
import type { BookingState } from "./BookingFlow";
import { getService } from "@/lib/data/services";

export function StepConfirm({
  state,
  onEdit,
}: {
  state: BookingState;
  onEdit: (step: BookingState["step"]) => void;
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
        year: "numeric",
      })
    : "—";

  return (
    <div>
      <h2 className="text-3xl text-text mb-2">{t("confirmTitle")}</h2>
      <p className="text-muted mb-8">{t("confirmSubtitle")}</p>

      <div className="card p-6 sm:p-8 space-y-1 max-w-2xl">
        <Row
          label={t("summary.barber")}
          value={barberLabel}
          onEdit={() => onEdit(1)}
        />
        <Row
          label={t("summary.service")}
          value={service ? tServices(`items.${service.id}.name`) : "—"}
          onEdit={() => onEdit(2)}
        />
        <Row label={t("summary.date")} value={dateLabel} onEdit={() => onEdit(3)} />
        <Row label={t("summary.time")} value={state.time ?? "—"} onEdit={() => onEdit(3)} />
        <Row
          label={t("summary.duration")}
          value={service ? `${service.durationMin} ${tServices("minutes")}` : "—"}
        />
        <Row
          label={t("summary.price")}
          value={service ? `€${service.priceEur}` : "—"}
          accent
        />
        <div className="h-px bg-line/40 my-3" />
        <Row label={t("summary.name")} value={state.name} onEdit={() => onEdit(4)} />
        <Row label={t("summary.phone")} value={state.phone} onEdit={() => onEdit(4)} />
        {state.note && (
          <Row label={t("summary.note")} value={state.note} onEdit={() => onEdit(4)} />
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  onEdit,
  accent,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span className="text-xs uppercase tracking-widest2 text-muted shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`text-right break-words ${
            accent ? "text-accent font-display text-2xl" : "text-text"
          }`}
        >
          {value}
        </span>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-muted hover:text-accent transition-colors"
            aria-label="Edit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
