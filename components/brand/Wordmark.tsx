import Image from "next/image";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: { w: 140, h: 56, h_class: "h-10 sm:h-12" },
    md: { w: 220, h: 88, h_class: "h-16 sm:h-20" },
    lg: { w: 360, h: 144, h_class: "h-28 sm:h-36" },
  }[size];

  return (
    <div className={cn("inline-block", className)}>
      <Image
        src="/logo-gentleman.png"
        alt="Gentleman Zadar Barbershop"
        width={dims.w}
        height={dims.h}
        priority={size !== "sm"}
        className={cn("w-auto", dims.h_class)}
      />
    </div>
  );
}

export function RazorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 22 L18 7 C20 5 22 5 23 6 C24 7 24 9 22 11 L7 26 Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M22 11 L26 15 C27 16 28 17 28 19 C28 21 26 23 24 23 C22 23 21 22 20 21 L18 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function CrownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 6 L8 16 L16 4 L24 16 L30 6 L28 20 L4 20 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="2" cy="6" r="1.5" fill="currentColor" />
      <circle cx="16" cy="4" r="1.5" fill="currentColor" />
      <circle cx="30" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ScissorsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 11 L28 24 M11 21 L28 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
