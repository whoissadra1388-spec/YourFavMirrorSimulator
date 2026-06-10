"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  delay?: number;
};

export default function GlassCard({ children, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.75,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.035,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="group relative h-56 w-72 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/40 hover:shadow-cyan-500/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-300/20" />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}