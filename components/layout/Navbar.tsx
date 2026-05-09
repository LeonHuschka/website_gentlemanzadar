"use client";

import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Wordmark } from "@/components/brand/Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#about", label: t("about") },
    { href: "/#services", label: t("services") },
    { href: "/#team", label: t("team") },
    { href: "/#gallery", label: t("gallery") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-line/50"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="relative z-50" aria-label="Gentleman Zadar">
          <Wordmark />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-display uppercase tracking-widest2 text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher compact />
          <Link href="/booking" className="btn-primary text-xs px-4 py-2.5">
            <Calendar className="h-4 w-4" />
            {t("book")}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden relative z-50 text-text"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-bg/98 backdrop-blur-lg z-40">
          <div className="container-x py-8 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-line/40 text-lg font-display uppercase tracking-widest2 text-text hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="btn-primary"
              >
                <Calendar className="h-4 w-4" />
                {t("book")}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
