"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  hr: "Hrvatski",
  en: "English",
  de: "Deutsch",
  es: "Español",
  pl: "Polski",
};

const flags: Record<Locale, string> = {
  hr: "🇭🇷",
  en: "🇬🇧",
  de: "🇩🇪",
  es: "🇪🇸",
  pl: "🇵🇱",
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 text-xs font-display uppercase tracking-widest2 text-muted hover:text-text transition-colors",
          compact ? "border-0" : "border border-line/60 hover:border-accent/50",
        )}
      >
        <Globe className="h-4 w-4" />
        <span>{flags[locale]} {!compact && labels[locale]}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 min-w-[180px] bg-surface border border-line z-50 shadow-2xl shadow-black/60"
        >
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={l === locale}
              onClick={() => switchTo(l)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors",
                l === locale
                  ? "text-accent bg-surface-2"
                  : "text-text hover:text-accent hover:bg-surface-2",
              )}
            >
              <span className="flex items-center gap-2">
                <span>{flags[l]}</span>
                <span className="font-display uppercase tracking-widest2 text-xs">{labels[l]}</span>
              </span>
              {l === locale && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
