import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="kicker">{kicker}</span>
      <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-balance">{title}</h2>
      {subtitle && <p className="mt-5 text-muted text-lg text-pretty">{subtitle}</p>}
    </div>
  );
}
