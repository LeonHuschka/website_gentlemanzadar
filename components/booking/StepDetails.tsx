"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = (msgs: { name: string; phoneRequired: string; phoneInvalid: string }) =>
  z.object({
    name: z.string().trim().min(2, msgs.name),
    phone: z
      .string()
      .trim()
      .min(6, msgs.phoneRequired)
      .regex(/^[+\d][\d\s\-()]+$/, msgs.phoneInvalid),
    note: z.string().trim().max(500).optional().default(""),
  });

type FormValues = z.infer<ReturnType<typeof schema>>;

export function StepDetails({
  initial,
  onSubmit,
  onValid,
}: {
  initial: { name: string; phone: string; note: string };
  onSubmit: (data: { name: string; phone: string; note: string }) => void;
  onValid: (data: { name: string; phone: string; note: string }) => void;
}) {
  const t = useTranslations("booking");
  const tv = useTranslations("booking.validation");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      schema({
        name: tv("nameRequired"),
        phoneRequired: tv("phoneRequired"),
        phoneInvalid: tv("phoneInvalid"),
      }),
    ),
    defaultValues: initial,
    mode: "onBlur",
  });

  const name = watch("name");
  const phone = watch("phone");
  const note = watch("note");

  const onValidRef = useRef(onValid);
  onValidRef.current = onValid;

  useEffect(() => {
    onValidRef.current({ name: name ?? "", phone: phone ?? "", note: note ?? "" });
  }, [name, phone, note]);

  return (
    <div>
      <h2 className="text-3xl text-text mb-2">{t("detailsTitle")}</h2>
      <p className="text-muted mb-8">{t("detailsSubtitle")}</p>

      <form
        id="details-form"
        onSubmit={handleSubmit((d) => {
          onValid({ name: d.name, phone: d.phone, note: d.note ?? "" });
          onSubmit({ name: d.name, phone: d.phone, note: d.note ?? "" });
        })}
        className="grid sm:grid-cols-2 gap-6 max-w-2xl"
      >
        <div className="sm:col-span-1">
          <label className="label" htmlFor="name">{t("name")}</label>
          <input
            id="name"
            className="input"
            placeholder={t("namePlaceholder")}
            {...register("name")}
          />
          {errors.name && (
            <span className="block mt-1 text-xs text-danger">{errors.name.message}</span>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className="label" htmlFor="phone">{t("phone")}</label>
          <input
            id="phone"
            type="tel"
            className="input"
            placeholder={t("phonePlaceholder")}
            {...register("phone")}
          />
          {errors.phone && (
            <span className="block mt-1 text-xs text-danger">{errors.phone.message}</span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="note">{t("note")}</label>
          <textarea
            id="note"
            className="input min-h-[100px] resize-y"
            placeholder={t("notePlaceholder")}
            {...register("note")}
          />
        </div>
      </form>
    </div>
  );
}
