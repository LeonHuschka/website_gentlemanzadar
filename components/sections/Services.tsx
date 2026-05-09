import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeader } from "./SectionHeader";
import { services } from "@/lib/data/services";

export function Services() {
  const t = useTranslations("services");
  const tNav = useTranslations("nav");

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-surface/30">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(var(--accent) / 0.4), transparent)",
        }}
      />
      <div className="container-x">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line/40 border border-line/40">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-bg p-8 group hover:bg-surface-2 transition-colors flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl text-text group-hover:text-accent transition-colors">
                  {t(`items.${s.id}.name`)}
                </h3>
                <span className="font-display text-accent text-3xl shrink-0">
                  €{s.priceEur}
                </span>
              </div>
              <p className="mt-4 text-muted text-sm leading-relaxed flex-1">
                {t(`items.${s.id}.desc`)}
              </p>
              <div className="mt-6 pt-6 border-t border-line/50 flex items-center justify-between text-xs uppercase tracking-widest2 text-muted">
                <span>{s.durationMin} {t("minutes")}</span>
                <span className="text-accent/70">·</span>
                <span>#{s.id}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/booking" className="btn-primary">
            <Calendar className="h-4 w-4" />
            {tNav("book")}
          </Link>
        </div>
      </div>
    </section>
  );
}
