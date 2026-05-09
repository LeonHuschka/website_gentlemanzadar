"use client";

import { useReducer, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BarberId } from "@/lib/data/barbers";
import type { ServiceId } from "@/lib/data/services";
import { StepBarber } from "./StepBarber";
import { StepService } from "./StepService";
import { StepDateTime } from "./StepDateTime";
import { StepDetails } from "./StepDetails";
import { StepConfirm } from "./StepConfirm";
import { BookingSuccess } from "./BookingSuccess";

export type BookingState = {
  step: 1 | 2 | 3 | 4 | 5;
  barberId: BarberId | "any" | null;
  serviceId: ServiceId | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  note: string;
  bookingCode: string | null;
};

type Action =
  | { type: "SET_BARBER"; id: BarberId | "any" }
  | { type: "SET_SERVICE"; id: ServiceId }
  | { type: "SET_DATE"; date: Date | null }
  | { type: "SET_TIME"; time: string }
  | { type: "SET_DETAILS"; name: string; phone: string; note: string }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "GOTO"; step: BookingState["step"] }
  | { type: "SUCCESS"; code: string }
  | { type: "RESET" };

const initial: BookingState = {
  step: 1,
  barberId: null,
  serviceId: null,
  date: null,
  time: null,
  name: "",
  phone: "",
  note: "",
  bookingCode: null,
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "SET_BARBER":
      return { ...state, barberId: action.id };
    case "SET_SERVICE":
      return { ...state, serviceId: action.id };
    case "SET_DATE":
      return { ...state, date: action.date, time: null };
    case "SET_TIME":
      return { ...state, time: action.time };
    case "SET_DETAILS":
      return { ...state, name: action.name, phone: action.phone, note: action.note };
    case "NEXT":
      return { ...state, step: Math.min(5, state.step + 1) as BookingState["step"] };
    case "BACK":
      return { ...state, step: Math.max(1, state.step - 1) as BookingState["step"] };
    case "GOTO":
      return { ...state, step: action.step };
    case "SUCCESS":
      return { ...state, bookingCode: action.code };
    case "RESET":
      return initial;
  }
}

export function BookingFlow() {
  const t = useTranslations("booking");
  const [state, dispatch] = useReducer(reducer, initial);
  const [submitting, setSubmitting] = useState(false);

  const stepLabels = [
    t("steps.barber"),
    t("steps.service"),
    t("steps.datetime"),
    t("steps.details"),
    t("steps.confirm"),
  ];

  function handleSubmit() {
    setSubmitting(true);
    // TODO: connect to booking backend
    setTimeout(() => {
      const code = `GZ-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      dispatch({ type: "SUCCESS", code });
      setSubmitting(false);
    }, 900);
  }

  if (state.bookingCode) {
    return <BookingSuccess code={state.bookingCode} state={state} onReset={() => dispatch({ type: "RESET" })} />;
  }

  const canGoNext =
    (state.step === 1 && state.barberId !== null) ||
    (state.step === 2 && state.serviceId !== null) ||
    (state.step === 3 && state.date !== null && state.time !== null) ||
    (state.step === 4 && state.name.trim().length > 1 && state.phone.trim().length > 5);

  return (
    <div className="container-x py-24 sm:py-32 max-w-4xl">
      <div className="mb-12">
        <span className="kicker">Gentleman · Zadar</span>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">{t("title")}</h1>
        <p className="mt-3 text-muted">{t("subtitle")}</p>
        <p className="mt-2 text-xs uppercase tracking-widest2 text-accent/70">{t("demoNote")}</p>
      </div>

      <ProgressBar step={state.step} labels={stepLabels} />

      <div className="mt-12 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {state.step === 1 && (
              <StepBarber
                value={state.barberId}
                onSelect={(id) => {
                  dispatch({ type: "SET_BARBER", id });
                  setTimeout(() => dispatch({ type: "NEXT" }), 250);
                }}
              />
            )}
            {state.step === 2 && (
              <StepService
                value={state.serviceId}
                onSelect={(id) => {
                  dispatch({ type: "SET_SERVICE", id });
                  setTimeout(() => dispatch({ type: "NEXT" }), 250);
                }}
              />
            )}
            {state.step === 3 && (
              <StepDateTime
                serviceId={state.serviceId!}
                date={state.date}
                time={state.time}
                onDate={(d) => dispatch({ type: "SET_DATE", date: d })}
                onTime={(t) => dispatch({ type: "SET_TIME", time: t })}
              />
            )}
            {state.step === 4 && (
              <StepDetails
                initial={{ name: state.name, phone: state.phone, note: state.note }}
                onValid={(d) => dispatch({ type: "SET_DETAILS", ...d })}
                onSubmit={(d) => {
                  dispatch({ type: "SET_DETAILS", ...d });
                  dispatch({ type: "NEXT" });
                }}
              />
            )}
            {state.step === 5 && (
              <StepConfirm state={state} onEdit={(s) => dispatch({ type: "GOTO", step: s })} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 pt-8 border-t border-line/40">
        <button
          type="button"
          onClick={() => dispatch({ type: "BACK" })}
          disabled={state.step === 1}
          className={cn(
            "btn-ghost",
            state.step === 1 && "invisible",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          {t("back")}
        </button>

        {state.step === 5 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? t("submitting") : t("submit")}
          </button>
        ) : state.step === 3 || state.step === 4 ? (
          <button
            type="button"
            onClick={() => {
              if (state.step === 4) {
                document.querySelector<HTMLFormElement>("form#details-form")?.requestSubmit();
              } else {
                dispatch({ type: "NEXT" });
              }
            }}
            disabled={!canGoNext}
            className="btn-primary"
          >
            {t("next")}
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <div key={label} className="flex-1 flex items-center gap-2">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={cn(
                  "w-full h-px transition-colors",
                  done || active ? "bg-accent" : "bg-line",
                )}
              />
              <span
                className={cn(
                  "text-[0.625rem] sm:text-xs uppercase tracking-widest2 font-display whitespace-nowrap",
                  active ? "text-accent" : done ? "text-text" : "text-muted",
                )}
              >
                <span className="hidden sm:inline">{n}. </span>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
