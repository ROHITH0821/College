"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { type FormEvent, useCallback, useId, useMemo, useState } from "react";
import { CONTACT_PAGE_VISUAL, CONTACT_TOPICS } from "@/data/contact";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  consent: false,
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const focusInput =
  "rounded-xl border border-[#1F3A5F]/15 bg-white px-4 py-3 text-[#1F3A5F] shadow-sm outline-none transition placeholder:text-[#5a6b82]/55 focus:border-[#1F3A5F]/35 focus:ring-2 focus:ring-[#F68121]/25";

export function ContactExperience() {
  const reduceMotion = useReducedMotion();
  const formId = useId();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "form", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const validate = useCallback(() => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailOk(form.email)) next.email = "Enter a valid email address.";
    if (!form.topic) next.topic = "Choose a topic so we can route your message.";
    if (!form.message.trim()) next.message = "Tell us how we can help.";
    else if (form.message.trim().length < 10) next.message = "A few more words help us respond.";
    else if (form.message.length > 2000) next.message = "Please keep your message under 2,000 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      topic: true,
      message: true,
      consent: true,
    });
    if (!validate()) return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("success");
      setForm(initialForm);
      setTouched({});
      setErrors({});
    }, reduceMotion ? 200 : 900);
  };

  const motionFade = useMemo(
    () =>
      reduceMotion
        ? { initial: false, animate: { opacity: 1 } }
        : {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
          },
    [reduceMotion]
  );

  const stagger = reduceMotion ? 0 : 0.06;

  return (
    <div className="relative overflow-hidden border-b border-[#1F3A5F]/10 bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(246,129,33,0.07),transparent),radial-gradient(ellipse_60%_40%_at_100%_20%,rgba(31,58,95,0.05),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20 lg:px-16">
        <motion.header className="mx-auto max-w-3xl text-center" {...motionFade}>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#1F3A5F] md:text-5xl lg:text-[3.25rem]">
            Contact us
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#5a6b82] md:text-xl">
            Send a message—admissions, visits, or anything else. We usually reply within one business
            day.
          </p>
        </motion.header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Left column — visual + quick facts */}
          <motion.aside
            className="flex flex-col gap-8 lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#1F3A5F]/10 bg-[#f8fafc] shadow-[0_20px_60px_-28px_rgba(31,58,95,0.2)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={CONTACT_PAGE_VISUAL.src}
                  alt={CONTACT_PAGE_VISUAL.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                  quality={88}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1F3A5F]/55 via-transparent to-transparent"
                  aria-hidden
                />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white drop-shadow">
                  We&apos;re here to help you explore CMREC.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                {
                  icon: MapPin,
                  title: "Main campus",
                  body: "Survey No. 69, CMR Marg, Medchal Road, Hyderabad, Telangana 500043",
                  color: "text-[#F68121]",
                },
                {
                  icon: MapPin,
                  title: "City office",
                  body: "HITEC City, Hyderabad — visits by appointment",
                  color: "text-[#6DBE45]",
                },
                {
                  icon: Mail,
                  title: "Email",
                  body: (
                    <a
                      href="mailto:hello@cmr.example.edu"
                      className="font-medium text-[#1F3A5F] underline-offset-2 hover:text-[#F68121] hover:underline"
                    >
                      hello@cmr.example.edu
                    </a>
                  ),
                  color: "text-[#F68121]",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  body: (
                    <a
                      href="tel:+914012345678"
                      className="font-medium text-[#1F3A5F] underline-offset-2 hover:text-[#F68121] hover:underline"
                    >
                      +91 40 1234 5678
                    </a>
                  ),
                  color: "text-[#F68121]",
                },
                {
                  icon: Clock,
                  title: "Office hours",
                  body: "Mon–Sat · 9:00 am – 5:00 pm (IST)",
                  color: "text-[#1F3A5F]/70",
                },
              ].map((row, i) => {
                const RowIcon = row.icon;
                return (
                <motion.li
                  key={row.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stagger * i, duration: 0.35 }}
                  className="flex gap-4 rounded-2xl border border-[#1F3A5F]/08 bg-white p-4 shadow-sm"
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F3A5F]/06 ${row.color}`}
                  >
                    <RowIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1F3A5F]/55">
                      {row.title}
                    </p>
                    <div className="mt-1 text-sm leading-relaxed text-[#5a6b82]">{row.body}</div>
                  </div>
                </motion.li>
                );
              })}
            </ul>
          </motion.aside>

          {/* Form card */}
          <motion.div
            className="lg:col-span-7"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-3xl border border-[#1F3A5F]/12 bg-white p-6 shadow-[0_24px_80px_-32px_rgba(31,58,95,0.18)] md:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute left-0 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-[#F68121] via-[#F68121]/60 to-[#1F3A5F]/30"
                aria-hidden
              />
              <div className="pl-4 md:pl-6">
                <div className="mb-8 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1F3A5F] text-white shadow-md">
                    <MessageSquare className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-[#1F3A5F]">
                      Write to us
                    </h2>
                    <p className="mt-1 text-sm text-[#5a6b82]">
                      Fields marked <span className="text-[#c45f0f]">*</span> are required.
                    </p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      role="status"
                      aria-live="polite"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center py-10 text-center"
                    >
                      <motion.div
                        initial={reduceMotion ? false : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      >
                        <CheckCircle2 className="h-16 w-16 text-[#6DBE45]" aria-hidden />
                      </motion.div>
                      <p className="mt-6 font-display text-2xl font-semibold text-[#1F3A5F]">
                        Thank you!
                      </p>
                      <p className="mt-2 max-w-md text-[#5a6b82]">
                        Your message is on its way. Our team will respond by email as soon as
                        possible.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-8 rounded-full border border-[#1F3A5F]/20 px-6 py-2.5 text-sm font-semibold text-[#1F3A5F] transition hover:border-[#F68121]/40 hover:text-[#F68121]"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      id={formId}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-[#1F3A5F]">
                            Full name <span className="text-[#c45f0f]">*</span>
                          </label>
                          <input
                            id={`${formId}-name`}
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            className={`mt-2 w-full ${focusInput}`}
                            placeholder="Your name"
                            aria-invalid={touched.name && errors.name ? true : undefined}
                            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                          />
                          {touched.name && errors.name && (
                            <p id={`${formId}-name-err`} className="mt-1.5 text-sm text-red-600" role="alert">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-[#1F3A5F]">
                            Email <span className="text-[#c45f0f]">*</span>
                          </label>
                          <input
                            id={`${formId}-email`}
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            className={`mt-2 w-full ${focusInput}`}
                            placeholder="you@example.com"
                            aria-invalid={touched.email && errors.email ? true : undefined}
                            aria-describedby={
                              [
                                `${formId}-email-hint`,
                                touched.email && errors.email ? `${formId}-email-err` : null,
                              ]
                                .filter(Boolean)
                                .join(" ") || undefined
                            }
                          />
                          <p id={`${formId}-email-hint`} className="mt-1.5 text-xs text-[#5a6b82]/90">
                            We&apos;ll only use this to reply to your enquiry.
                          </p>
                          {touched.email && errors.email && (
                            <p id={`${formId}-email-err`} className="mt-1.5 text-sm text-red-600" role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-[#1F3A5F]">
                            Phone <span className="text-[#5a6b82]/80">(optional)</span>
                          </label>
                          <input
                            id={`${formId}-phone`}
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            value={form.phone}
                            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                            className={`mt-2 w-full ${focusInput}`}
                            placeholder="+91 …"
                          />
                        </div>
                        <div>
                          <label htmlFor={`${formId}-topic`} className="block text-sm font-semibold text-[#1F3A5F]">
                            Topic <span className="text-[#c45f0f]">*</span>
                          </label>
                          <select
                            id={`${formId}-topic`}
                            name="topic"
                            value={form.topic}
                            onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                            onBlur={() => setTouched((t) => ({ ...t, topic: true }))}
                            className={`mt-2 w-full ${focusInput} appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231F3A5F' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            }}
                            aria-invalid={touched.topic && errors.topic ? true : undefined}
                            aria-describedby={errors.topic ? `${formId}-topic-err` : undefined}
                          >
                            {CONTACT_TOPICS.map((opt) => (
                              <option key={opt.value || "placeholder"} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {touched.topic && errors.topic && (
                            <p id={`${formId}-topic-err`} className="mt-1.5 text-sm text-red-600" role="alert">
                              {errors.topic}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-[#1F3A5F]">
                          Message <span className="text-[#c45f0f]">*</span>
                        </label>
                        <textarea
                          id={`${formId}-message`}
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                          className={`mt-2 w-full resize-y ${focusInput}`}
                          placeholder="Tell us what you need—programmes, visit dates, or questions."
                          aria-invalid={touched.message && errors.message ? true : undefined}
                          aria-describedby={
                            [
                              `${formId}-msg-count`,
                              touched.message && errors.message ? `${formId}-message-err` : null,
                            ]
                              .filter(Boolean)
                              .join(" ") || undefined
                          }
                          maxLength={2000}
                        />
                        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                          <p id={`${formId}-msg-count`} className="text-xs text-[#5a6b82]/90">
                            {form.message.length} / 2000 characters
                          </p>
                          {touched.message && errors.message && (
                            <p id={`${formId}-message-err`} className="text-sm text-red-600" role="alert">
                              {errors.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-[#1F3A5F]/08 bg-[#f8fafc] p-4">
                        <input
                          id={`${formId}-consent`}
                          name="consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                          className="mt-1 h-4 w-4 rounded border-[#1F3A5F]/30 text-[#1F3A5F] focus:ring-[#F68121]"
                        />
                        <label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed text-[#5a6b82]">
                          I agree to be contacted regarding this enquiry. You can publish a privacy
                          policy URL here when ready.
                        </label>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1F3A5F] py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#2a4a73] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
                        whileHover={reduceMotion || status === "sending" ? undefined : { scale: 1.02 }}
                        whileTap={reduceMotion || status === "sending" ? undefined : { scale: 0.98 }}
                      >
                        {status === "sending" ? (
                          <>
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" aria-hidden />
                            Send message
                          </>
                        )}
                      </motion.button>
                      <p className="text-xs text-[#5a6b82]/90">
                        This demo form shows a success screen only. Wire it to your email service or CRM
                        when ready.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
