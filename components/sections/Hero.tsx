"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onCanPlay = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] pt-24 pb-12 flex items-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="auto"
        poster="/salon-2.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/salon-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-bg/75" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.4) 40%, hsl(var(--bg) / 0.6) 100%), radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.15), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(var(--accent) / 0.5), transparent)",
        }}
      />

      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="kicker mb-6"
          >
            {t("kicker")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl leading-[0.9] text-balance"
          >
            <span className="block">{t("title").split(".")[0]}.</span>
            <span className="block text-accent">{t("title").split(".").slice(1).join(".").trim()}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-lg sm:text-xl text-muted max-w-xl text-pretty"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/booking" className="btn-primary">
              <Calendar className="h-4 w-4" />
              {t("ctaPrimary")}
            </Link>
            <a href="#services" className="btn-secondary">
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block lg:col-span-5"
        >
          <HeroEmblem />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors animate-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}

function HeroEmblem() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 border border-accent/30" />
      <div className="absolute inset-4 border border-accent/20" />
      <div className="absolute inset-0 grid place-items-center px-10">
        <Image
          src="/logo-gentleman.png"
          alt="Gentleman Zadar Barbershop"
          width={520}
          height={208}
          priority
          className="w-full h-auto"
        />
      </div>
      <div className="absolute -top-2 -right-2 h-6 w-6 border-t border-r border-accent" />
      <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b border-l border-accent" />
      <div className="absolute top-3 left-3 font-display uppercase tracking-widest2 text-accent text-[0.65rem]">
        Est. 2018
      </div>
      <div className="absolute bottom-3 right-3 font-display uppercase tracking-widest2 text-muted text-[0.65rem]">
        Zadar · Croatia
      </div>
    </div>
  );
}
