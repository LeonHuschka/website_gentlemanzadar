import { useTranslations } from "next-intl";
import { Instagram, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Wordmark } from "@/components/brand/Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tLoc = useTranslations("location");

  return (
    <footer className="relative z-10 mt-32 border-t border-line/50 bg-surface/40">
      <div className="barber-stripe h-1.5 animate-barber-stripe" />
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Wordmark />
          <p className="text-sm text-muted max-w-sm">{tFooter("tagline")}</p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/barbershopgentlemanzadar/"
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-line/60 hover:border-accent hover:text-accent text-muted transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="tel:+385000000000"
              className="p-2 border border-line/60 hover:border-accent hover:text-accent text-muted transition-colors"
              aria-label="Phone"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/385000000000"
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-line/60 hover:border-accent hover:text-accent text-muted transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-accent mb-4">{tLoc("title")}</h4>
          <a
            href="https://maps.google.com/?q=Put+Mirvice+85,+Zadar"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text hover:text-accent transition-colors flex items-start gap-2"
          >
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{tLoc("address")}</span>
          </a>
          <div className="mt-4 space-y-1 text-sm text-muted">
            <div className="flex justify-between gap-6">
              <span>{tLoc("days.monFri")}</span>
              <span className="text-text">{tLoc("hoursWeek")}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>{tLoc("days.sat")}</span>
              <span className="text-text">{tLoc("hoursSat")}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>{tLoc("days.sun")}</span>
              <span className="text-muted">{tLoc("hoursSun")}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-accent mb-4">{tNav("home")}</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/#about" className="text-muted hover:text-accent transition-colors">{tNav("about")}</a>
            <a href="/#services" className="text-muted hover:text-accent transition-colors">{tNav("services")}</a>
            <a href="/#team" className="text-muted hover:text-accent transition-colors">{tNav("team")}</a>
            <a href="/#contact" className="text-muted hover:text-accent transition-colors">{tNav("contact")}</a>
            <Link href="/booking" className="text-accent hover:text-accent-strong transition-colors">{tNav("book")}</Link>
          </div>
          <div className="mt-6">
            <span className="block text-xs text-muted mb-2 uppercase tracking-widest2">{tFooter("language")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <div className="border-t border-line/40">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <span>© {new Date().getFullYear()} Gentleman Zadar.</span>
          <span>{tFooter("rights")}</span>
        </div>
      </div>
    </footer>
  );
}
