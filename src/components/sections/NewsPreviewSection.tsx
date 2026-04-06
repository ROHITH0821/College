"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NEWS_POST_IMAGES } from "@/constants/home-section-media";

const posts: { title: string; excerpt: string; date: string; href: string }[] = [
  {
    title: "Collaboration, innovation & creativity workshop",
    excerpt:
      "EDC session on collaborative tools and creative problem-solving for student innovators.",
    date: "Aug 2023",
    href: "/blog",
  },
  {
    title: "Mobile application development lab",
    excerpt:
      "Hands-on Android stack — intents, layouts, SQLite — for IT semester programmes.",
    date: "Aug 2023",
    href: "/blog",
  },
  {
    title: "Computer networks & web programming lab",
    excerpt:
      "Protocols, simulators, and full-stack basics aligned to autonomous curriculum outcomes.",
    date: "Aug 2023",
    href: "/blog",
  },
];

export function NewsPreviewSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="news"
      className="scroll-mt-[var(--home-sticky-top)] border-b border-[#1F3A5F]/10 bg-[#f1f5f9] px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">
              Blog & updates
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[#1F3A5F] md:text-4xl">
              Campus stories & announcements
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#1F3A5F] hover:text-[#F68121] md:self-auto"
          >
            View all posts
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.li
              key={post.title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-white shadow-sm transition hover:border-[#F68121]/30 hover:shadow-md">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1F3A5F]/10">
                  <Image
                    src={NEWS_POST_IMAGES[i] ?? NEWS_POST_IMAGES[0]}
                    alt={post.title}
                    fill
                    className="object-cover object-center transition duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={92}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-[#5a6b82]">
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    <time dateTime="2023-08">{post.date}</time>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug text-[#1F3A5F]">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a6b82]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#F68121]"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
