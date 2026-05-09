import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { PlaceholderImage } from "@/components/brand/PlaceholderImage";
import { barbers } from "@/lib/data/barbers";

export function Team() {
  const t = useTranslations("team");
  const tBarbers = useTranslations("barbers");

  return (
    <section id="team" className="container-x py-24 sm:py-32">
      <SectionHeader
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {barbers.map((b) => (
          <div key={b.id} className="group">
            <div className="relative">
              <PlaceholderImage label={b.initials} aspect="aspect-[3/4]" />
              <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-bg text-[0.625rem] font-display uppercase tracking-widest2">
                {b.initials}
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-2xl text-text group-hover:text-accent transition-colors">
                {tBarbers(`${b.id}.name`)}
              </h3>
              <div className="mt-1 text-xs text-accent uppercase tracking-widest2">
                {tBarbers(`${b.id}.role`)}
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {tBarbers(`${b.id}.bio`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
