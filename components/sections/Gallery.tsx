import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { PlaceholderImage } from "@/components/brand/PlaceholderImage";

const tiles = [
  { aspect: "aspect-[4/5]", span: "row-span-2" },
  { aspect: "aspect-[4/3]", span: "" },
  { aspect: "aspect-square", span: "" },
  { aspect: "aspect-[3/4]", span: "" },
  { aspect: "aspect-[4/3]", span: "" },
  { aspect: "aspect-square", span: "row-span-2" },
  { aspect: "aspect-[4/3]", span: "" },
];

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-surface/30">
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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[180px]">
          {tiles.map((tile, i) => (
            <div key={i} className={`${tile.span}`}>
              <PlaceholderImage
                aspect="h-full w-full"
                className="!aspect-auto h-full w-full"
                label={`#${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
