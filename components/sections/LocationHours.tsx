import { useTranslations } from "next-intl";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function LocationHours() {
  const t = useTranslations("location");

  return (
    <section id="location" className="container-x py-24 sm:py-32">
      <SectionHeader
        kicker={t("kicker")}
        title={t("title")}
      />

      <div className="mt-16 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] border border-line/60 overflow-hidden">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2840.0!2d15.235!3d44.119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPut%20Mirvice%2085%2C%20Zadar!5e0!3m2!1sen!2shr!4v1700000000000"
            className="w-full h-full grayscale-[0.4] contrast-[1.1] brightness-75"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/20 mix-blend-overlay" />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="card p-8">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted uppercase tracking-widest2 mb-1">
                  {t("title")}
                </div>
                <div className="text-lg text-text">{t("address")}</div>
                <a
                  href="https://maps.google.com/?q=Put+Mirvice+85,+Zadar"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-strong transition-colors uppercase tracking-widest2"
                >
                  {t("directions")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-start gap-3 mb-5">
              <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-xs text-muted uppercase tracking-widest2">
                {t("hoursTitle")}
              </div>
            </div>
            <ul className="space-y-3">
              <HourRow day={t("days.monFri")} hours={t("hoursWeek")} />
              <HourRow day={t("days.sat")} hours={t("hoursSat")} />
              <HourRow day={t("days.sun")} hours={t("hoursSun")} muted />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HourRow({ day, hours, muted }: { day: string; hours: string; muted?: boolean }) {
  return (
    <li className="flex items-baseline justify-between gap-4 pb-3 border-b border-line/40 last:border-0 last:pb-0">
      <span className="text-sm text-muted">{day}</span>
      <span className={`font-display tracking-widest2 text-base ${muted ? "text-muted/70" : "text-text"}`}>
        {hours}
      </span>
    </li>
  );
}
