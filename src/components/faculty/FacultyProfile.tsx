import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Microscope,
  Phone,
  User,
} from "lucide-react";
import type { FacultyMember } from "@/data/faculty";

function InfoBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#1F3A5F]/10 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1F3A5F]/[0.06] text-[#1F3A5F]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5a6b82]">{label}</p>
        <div className="mt-1.5 text-sm leading-relaxed text-[#1F3A5F]">{children}</div>
      </div>
    </div>
  );
}

export function FacultyProfile({ member }: { member: FacultyMember }) {
  const fullName = `${member.prefix} ${member.name}`;

  return (
    <article className="border-b border-[#1F3A5F]/10 bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-12 md:py-12 lg:px-16">
        <nav className="text-sm text-[#5a6b82]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#F68121]">
            Home
          </Link>
          <span className="mx-2 text-[#1F3A5F]/30">/</span>
          <Link href="/faculty" className="hover:text-[#F68121]">
            Faculty
          </Link>
          <span className="mx-2 text-[#1F3A5F]/30">/</span>
          <span className="font-medium text-[#1F3A5F]">{member.name}</span>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl border border-[#1F3A5F]/10 bg-[#1F3A5F]/10 shadow-[0_24px_60px_rgba(31,58,95,0.15)] lg:mx-0 lg:max-w-none lg:sticky lg:top-[calc(env(safe-area-inset-top)+var(--utility-bar-inner)+1rem)]">
            <Image
              src={member.imageUrl}
              alt={`Portrait of ${fullName}`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 340px"
              priority
              quality={90}
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">
              {member.department}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#1F3A5F] md:text-4xl lg:text-[2.35rem]">
              {fullName}
            </h1>
            <p className="mt-2 text-lg font-medium text-[#5a6b82]">{member.designation}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a6b82]">{member.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2a4a73]"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email
              </a>
              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F3A5F]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3A5F] transition hover:border-[#F68121]/40 hover:text-[#c45f0f]"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call
                </a>
              )}
              <Link
                href="/faculty"
                className="inline-flex items-center gap-2 rounded-full border border-[#1F3A5F]/15 px-5 py-2.5 text-sm font-semibold text-[#1F3A5F] transition hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All faculty
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <InfoBlock icon={User} label="About">
            <p>{member.bio}</p>
          </InfoBlock>
          <InfoBlock icon={GraduationCap} label="Qualifications">
            <ul className="list-inside list-disc space-y-1">
              {member.qualifications.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </InfoBlock>
          <InfoBlock icon={Briefcase} label="Experience">
            <p>
              <span className="font-semibold tabular-nums">{member.experienceYears}+ years</span> in
              higher education and {member.designation.toLowerCase()} roles.
            </p>
          </InfoBlock>
          {member.officeHours && (
            <InfoBlock icon={Clock} label="Office hours">
              <p>{member.officeHours}</p>
            </InfoBlock>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#1F3A5F]/10 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3 border-b border-[#1F3A5F]/10 pb-4">
              <Microscope className="h-6 w-6 text-[#F68121]" aria-hidden />
              <h2 className="font-display text-xl font-semibold text-[#1F3A5F]">
                Research & specialization
              </h2>
            </div>
            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a6b82]">
                  Specialization
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {member.specialization.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-[#1F3A5F]/[0.06] px-3 py-1 text-sm font-medium text-[#1F3A5F]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a6b82]">
                  Research areas
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-[#5a6b82]">
                  {member.researchAreas.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              {member.publicationsSummary && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a6b82]">
                    Publications & impact
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a6b82]">
                    {member.publicationsSummary}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-[#1F3A5F]/10 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3 border-b border-[#1F3A5F]/10 pb-4">
              <BookOpen className="h-6 w-6 text-[#F68121]" aria-hidden />
              <h2 className="font-display text-xl font-semibold text-[#1F3A5F]">
                Teaching
              </h2>
            </div>
            <ul className="mt-5 space-y-3">
              {member.teachingSubjects.map((t) => (
                <li
                  key={t}
                  className="flex gap-3 rounded-xl border border-[#1F3A5F]/8 bg-[#fafbfc] px-4 py-3 text-sm font-medium text-[#1F3A5F]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F68121]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-[#F68121]/25 bg-gradient-to-br from-[#fff8f2] to-white p-6 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#c45f0f]">Contact</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#1F3A5F] md:flex-row md:items-center md:gap-8">
            <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 font-semibold hover:text-[#F68121]">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {member.email}
            </a>
            {member.phone && (
              <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-[#F68121]">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {member.phone}
              </a>
            )}
            <span className="inline-flex items-center gap-2 text-[#5a6b82]">
              <MapPin className="h-4 w-4 shrink-0 text-[#F68121]" aria-hidden />
              CMR Engineering College, Medchal
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
