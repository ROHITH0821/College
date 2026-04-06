"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarRange, MapPin, Music2, Trophy } from "lucide-react";

const tiles = [
  {
    title: "Clubs & councils",
    desc: "50+ student-led clubs spanning arts, code, debate, and sustainability.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Culture & festivals",
    desc: "Annual fests, film nights, and design weeks with visiting artists.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Leadership labs",
    desc: "Mentored cohorts building real products and community programs.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  },
] as const;

const events = [
  { day: "12", month: "Apr", title: "Innovation Summit", place: "Main Auditorium" },
  { day: "26", month: "Apr", title: "Design Jam", place: "Maker Studio" },
  { day: "03", month: "May", title: "Industry Meet", place: "Innovation Hub" },
] as const;

export function StudentLifeSection() {
  return (
    <section
      id="students-corner"
      className="border-b border-[#1F3A5F]/10 bg-white px-6 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F68121]">
            Student Life & Activities
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F3A5F] md:text-4xl">
            A campus that stays awake after class
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiles.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-[#F5F7FA] shadow-sm"
            >
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#1F3A5F]">
                  <Music2 className="h-4 w-4" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Experience
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#1F3A5F]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a6b82]">{t.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div id="events" className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[1.75rem] border border-[#1F3A5F]/12 bg-gradient-to-br from-[#1F3A5F] via-[#1a3352] to-[#152d4a] p-1 shadow-[0_24px_70px_rgba(31,58,95,0.25)]"
          >
            <div className="rounded-[1.65rem] bg-[#0f1f2e]/85 p-6 backdrop-blur-md md:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                <div className="flex gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F68121]/25 to-transparent ring-1 ring-[#F68121]/35">
                    <CalendarRange className="h-7 w-7 text-[#F68121]" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white md:text-[1.65rem]">
                      Upcoming events
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">
                      Save the dates — keynotes, showcases, and recruiter days on campus.
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:justify-end">
                  {events.map((e, i) => (
                    <motion.div
                      key={e.title}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="group relative flex min-w-0 flex-1 overflow-hidden rounded-xl border border-white/15 bg-white/[0.07] sm:min-w-[220px] lg:max-w-[240px]"
                    >
                      <div className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center border-r border-dashed border-white/25 bg-black/20 py-4">
                        <span className="text-2xl font-bold tabular-nums leading-none text-[#F68121]">
                          {e.day}
                        </span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                          {e.month}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 px-4 py-3">
                        <p className="font-semibold leading-snug text-white">{e.title}</p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/55">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#6DBE45]" aria-hidden />
                          {e.place}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-sm text-white/60">
                <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-[#6DBE45]" aria-hidden />
                <p>Student teams won 18 national competitions last year.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
