import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FacultyProfile } from "@/components/faculty/FacultyProfile";
import { getAllFacultySlugs, getFacultyBySlug } from "@/data/faculty";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllFacultySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getFacultyBySlug(slug);
  if (!member) return { title: "Faculty" };
  return {
    title: `${member.prefix} ${member.name}`,
    description: member.tagline,
  };
}

export default async function FacultyMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getFacultyBySlug(slug);
  if (!member) notFound();

  return (
    <>
      <FacultyProfile member={member} />
    </>
  );
}
