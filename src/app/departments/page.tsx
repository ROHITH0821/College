import type { Metadata } from "next";
import Image from "next/image";
import { DepartmentsShowcase } from "@/components/departments/DepartmentsShowcase";
import { DEPARTMENTS, DEPARTMENTS_PAGE_HERO } from "@/data/departments";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Academic departments at CMR Engineering College — programmes, labs, and department information.",
};

export default function DepartmentsIndexPage() {
  return (
    <>
      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">Academics</p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F3A5F] md:text-4xl lg:text-[2.75rem]">
              Departments
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#5a6b82] md:text-lg">
              Choose a programme to open its hub—rules, syllabus, OBE, placements, events, faculty
              list, and other mandatory disclosures.
            </p>
          </div>
          <div className="relative h-40 w-full max-w-[320px] shrink-0 overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-[#f5f7fa] shadow-sm md:h-44 md:max-w-[280px]">
            <Image
              src={DEPARTMENTS_PAGE_HERO.image}
              alt={DEPARTMENTS_PAGE_HERO.imageAlt}
              width={560}
              height={320}
              className="h-full w-full object-cover"
              priority
              quality={88}
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <h2 className="font-display text-xl font-semibold text-[#1F3A5F] md:text-2xl">
              All programmes
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5a6b82] md:text-[15px]">
              Each card links to that department&apos;s page. Thumbnail images include written
              descriptions for people using screen readers or assistive technology.
            </p>
          </div>
          <DepartmentsShowcase departments={DEPARTMENTS} />
        </div>
      </section>
    </>
  );
}
