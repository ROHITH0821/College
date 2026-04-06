import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DepartmentMandatorySections } from "@/components/departments/DepartmentMandatorySections";
import { getAllDepartmentSlugs, getDepartmentBySlug } from "@/data/departments";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDepartmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) return { title: "Department" };
  return {
    title: dept.name,
    description: `${dept.name} — department information, syllabus, OBE, placements, and faculty at CMR Engineering College.`,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) notFound();

  return (
    <>
      <section className="border-b border-[#1F3A5F]/10 bg-white px-4 pb-10 pt-3 sm:px-6 sm:pt-5 md:px-12 md:pb-14 md:pt-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:gap-10">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-[#f5f7fa] shadow-sm md:mx-0 md:w-[260px]">
            <Image
              src={department.coverImage}
              alt={department.coverAlt}
              width={400}
              height={300}
              priority
              quality={88}
              sizes="(max-width: 768px) 280px, 260px"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <nav
              className="mb-6 flex flex-wrap items-center gap-1 text-sm text-[#5a6b82]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="underline-offset-2 transition hover:text-[#1F3A5F] hover:underline">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
              <Link
                href="/departments"
                className="underline-offset-2 transition hover:text-[#1F3A5F] hover:underline"
              >
                Departments
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
              <span className="font-medium text-[#1F3A5F]">{department.code}</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">Department</p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight text-[#1F3A5F] md:text-4xl lg:text-5xl">
              {department.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#5a6b82]">{department.description}</p>
          </div>
        </div>
      </section>

      <DepartmentMandatorySections department={department} />

      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-10 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
          <Link
            href="/departments"
            className="inline-flex rounded-full border border-[#1F3A5F]/20 px-6 py-2.5 text-sm font-semibold text-[#1F3A5F] transition hover:border-[#F68121]/40 hover:text-[#F68121]"
          >
            ← All departments
          </Link>
          <Link
            href="/programs"
            className="inline-flex rounded-full bg-[#1F3A5F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a4a73]"
          >
            Programs & academics
          </Link>
        </div>
      </section>
    </>
  );
}
