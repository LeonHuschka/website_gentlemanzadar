"use client";

import { useTranslations } from "next-intl";
import { Check, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { barbers } from "@/lib/data/barbers";
import type { BarberId } from "@/lib/data/barbers";
import { PlaceholderImage } from "@/components/brand/PlaceholderImage";

export function StepBarber({
  value,
  onSelect,
}: {
  value: BarberId | "any" | null;
  onSelect: (id: BarberId | "any") => void;
}) {
  const t = useTranslations("booking");
  const tBarbers = useTranslations("barbers");

  return (
    <div>
      <h2 className="text-3xl text-text mb-2">{t("selectBarberTitle")}</h2>
      <p className="text-muted mb-8">{t("selectBarberSubtitle")}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => onSelect("any")}
          className={cn(
            "card p-6 flex flex-col items-center text-center gap-3 transition-all",
            value === "any" && "border-accent bg-surface-2",
          )}
        >
          <div className="h-16 w-16 rounded-full bg-bg border border-accent grid place-items-center">
            <Users className="h-7 w-7 text-accent" />
          </div>
          <div>
            <div className="font-display uppercase tracking-widest2 text-sm text-text">
              {t("anyBarber")}
            </div>
            <div className="text-xs text-muted mt-1">{t("anyBarberDesc")}</div>
          </div>
          {value === "any" && <Check className="h-4 w-4 text-accent" />}
        </button>

        {barbers.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelect(b.id)}
            className={cn(
              "card p-3 text-left transition-all",
              value === b.id && "border-accent",
            )}
          >
            <div className="relative">
              <PlaceholderImage label={b.initials} aspect="aspect-[3/4]" />
              {value === b.id && (
                <div className="absolute top-2 right-2 h-7 w-7 grid place-items-center bg-accent text-bg">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="mt-3 px-1">
              <div className="font-display uppercase tracking-widest2 text-text">
                {tBarbers(`${b.id}.name`)}
              </div>
              <div className="text-[0.65rem] text-accent uppercase tracking-widest2 mt-0.5">
                {tBarbers(`${b.id}.role`)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
