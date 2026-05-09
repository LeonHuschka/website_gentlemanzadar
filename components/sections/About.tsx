import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="container-x py-24 sm:py-32">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <SectionHeader
            kicker={t("kicker")}
            title={t("title")}
          />
          <div className="mt-8 space-y-5 text-muted text-lg leading-relaxed text-pretty max-w-xl">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="6+" label="years" />
            <Stat value="4" label="barbers" />
            <Stat value="∞" label="cuts" />
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] overflow-hidden border border-line/40">
            <Image
              src="/salon-1.jpg"
              alt="Inside Gentleman Zadar barbershop"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 border border-accent/40 -z-0" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-accent text-4xl">{value}</div>
      <div className="text-xs uppercase tracking-widest2 text-muted mt-1">{label}</div>
    </div>
  );
}
