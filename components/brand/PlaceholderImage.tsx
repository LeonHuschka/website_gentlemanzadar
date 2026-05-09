import { cn } from "@/lib/utils";
import { RazorIcon } from "./Wordmark";

export function PlaceholderImage({
  label,
  className,
  aspect = "aspect-[4/5]",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-2 border border-line/40 grid place-items-center",
        aspect,
        className,
      )}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, hsl(var(--accent) / 0.18), transparent 50%), radial-gradient(circle at 80% 90%, hsl(var(--accent) / 0.12), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 48%, hsl(var(--line)) 48%, hsl(var(--line)) 52%, transparent 52%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-muted">
        <RazorIcon className="h-10 w-10 text-accent/40" />
        {label && (
          <span className="text-[0.625rem] uppercase tracking-widest2 font-display">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
