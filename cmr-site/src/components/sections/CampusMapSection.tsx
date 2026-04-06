"use client";

import { motion } from "framer-motion";
import { CampusMapEmbed } from "@/components/map/CampusMapEmbed";

export function CampusMapSection() {
  return (
    <section
      id="campus-map"
      className="border-b border-[#1F3A5F]/10 bg-gradient-to-b from-[#F5F7FA] to-white px-6 py-16 md:px-12 md:py-20 lg:px-16"
      aria-labelledby="campus-map-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">Location</p>
          <h2
            id="campus-map-heading"
            className="mt-3 font-display text-2xl font-semibold text-[#1F3A5F] md:text-3xl"
          >
            Campus map
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5a6b82] md:text-base">
            Survey No. 69, CMR Marg, Medchal Road — find directions and explore the area in Google
            Maps.
          </p>
        </motion.div>
        <div className="mt-8">
          <CampusMapEmbed />
        </div>
      </div>
    </section>
  );
}
