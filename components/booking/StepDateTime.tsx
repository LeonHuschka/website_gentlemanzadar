"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { DayPicker } from "react-day-picker";
import { hr, enGB, de, es, pl } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";
import { generateTimeSlots } from "@/lib/data/time-slots";
import { getService, type ServiceId } from "@/lib/data/services";

const localeMap = { hr, en: enGB, de, es, pl } as const;

export function StepDateTime({
  serviceId,
  date,
  time,
  onDate,
  onTime,
}: {
  serviceId: ServiceId;
  date: Date | null;
  time: string | null;
  onDate: (d: Date | null) => void;
  onTime: (t: string) => void;
}) {
  const t = useTranslations("booking");
  const locale = useLocale() as keyof typeof localeMap;
  const service = getService(serviceId);

  const slots = useMemo(
    () => generateTimeSlots(date ?? undefined, service?.durationMin ?? 30),
    [date, service?.durationMin],
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  return (
    <div>
      <h2 className="text-3xl text-text mb-2">{t("selectDateTitle")}</h2>
      <p className="text-muted mb-8">{t("selectDateSubtitle")}</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <DayPicker
            mode="single"
            locale={localeMap[locale] ?? hr}
            selected={date ?? undefined}
            onSelect={(d) => onDate(d ?? null)}
            disabled={[
              { before: today },
              { after: maxDate },
              { dayOfWeek: [0] },
            ]}
            weekStartsOn={1}
            showOutsideDays
            className="!m-0"
          />
        </div>

        <div className="card p-6">
          <div className="text-xs uppercase tracking-widest2 text-muted mb-4">
            {date
              ? date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })
              : t("noSlots")}
          </div>
          {date && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((s) => (
                <button
                  key={s.time}
                  type="button"
                  disabled={!s.available}
                  onClick={() => onTime(s.time)}
                  className={cn(
                    "py-2.5 text-sm font-display tracking-widest2 transition-colors border",
                    !s.available && "border-line/30 text-muted/40 line-through cursor-not-allowed",
                    s.available && time !== s.time && "border-line/60 text-text hover:border-accent hover:text-accent",
                    s.available && time === s.time && "bg-accent border-accent text-bg",
                  )}
                >
                  {s.time}
                </button>
              ))}
              {slots.length === 0 && (
                <div className="col-span-full text-center text-muted text-sm py-8">
                  —
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
