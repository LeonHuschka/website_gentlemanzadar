import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { PlaceholderImage } from "@/components/brand/PlaceholderImage";

type Tile =
  | { kind: "photo"; src: string; alt: string; span?: string }
  | { kind: "placeholder"; span?: string; label?: string };

const tiles: Tile[] = [
  { kind: "photo", src: "/salon-2.jpg", alt: "Two barbers at work", span: "row-span-2" },
  { kind: "photo", src: "/salon-4.jpg", alt: "Fresh fade haircut" },
  { kind: "photo", src: "/salon-1.jpg", alt: "Barber working" },
  { kind: "photo", src: "/salon-5.jpg", alt: "Hot towel beard shave" },
  { kind: "photo", src: "/salon-3.jpg", alt: "Inside the salon", span: "row-span-2" },
  { kind: "placeholder" },
  { kind: "placeholder" },
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
            <div key={i} className={tile.span ?? ""}>
              {tile.kind === "photo" ? (
                <div className="relative h-full w-full overflow-hidden border border-line/40 group">
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  aspect="h-full w-full"
                  className="!aspect-auto h-full w-full"
                  label={`#${i + 1}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
