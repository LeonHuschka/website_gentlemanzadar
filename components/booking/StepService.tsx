"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";
import type { ServiceId } from "@/lib/data/services";

export function StepService({
  value,
  onSelect,
}: {
  value: ServiceId | null;
  onSelect: (id: ServiceId) => void;
}) {
  const t = useTranslations("booking");
  const tServices = useTranslations("services");

  return (
    <div>
      <h2 className="text-3xl text-text mb-2">{t("selectServiceTitle")}</h2>
      <p className="text-muted mb-8">{t("selectServiceSubtitle")}</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {services.map((s) => {
          const selected = value === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={cn(
                "card p-5 text-left flex items-start gap-4 transition-all",
                selected && "border-accent bg-surface-2",
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display uppercase tracking-widest2 text-lg text-text">
                    {tServices(`items.${s.id}.name`)}
                  </h3>
                  <span className="font-display text-accent text-2xl shrink-0">
                    €{s.priceEur}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted line-clamp-2">
                  {tServices(`items.${s.id}.desc`)}
                </p>
                <div className="mt-3 text-xs text-muted uppercase tracking-widest2">
                  {s.durationMin} {tServices("minutes")}
                </div>
              </div>
              <div
                className={cn(
                  "h-6 w-6 shrink-0 border grid place-items-center transition-colors",
                  selected ? "bg-accent border-accent text-bg" : "border-line",
                )}
              >
                {selected && <Check className="h-4 w-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
