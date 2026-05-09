import { useTranslations } from "next-intl";
import { Phone, MessageCircle, Instagram, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const t = useTranslations("contact");
  const tNav = useTranslations("nav");

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-surface/30">
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
          align="center"
        />

        <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            label={t("callUs")}
            value="+385 XX XXX XXXX"
            href="tel:+385000000000"
          />
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            label={t("whatsapp")}
            value="+385 XX XXX XXXX"
            href="https://wa.me/385000000000"
          />
          <ContactCard
            icon={<Instagram className="h-5 w-5" />}
            label={t("instagram")}
            value="@barbershopgentlemanzadar"
            href="https://www.instagram.com/barbershopgentlemanzadar/"
          />
        </div>

        <div className="mt-12 text-center">
          <Link href="/booking" className="btn-primary">
            <Calendar className="h-4 w-4" />
            {tNav("book")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="card p-6 group hover:bg-surface-2 transition-all"
    >
      <div className="text-accent group-hover:text-accent-strong transition-colors">{icon}</div>
      <div className="mt-4 text-xs uppercase tracking-widest2 text-muted">{label}</div>
      <div className="mt-1 text-text break-all">{value}</div>
    </a>
  );
}
