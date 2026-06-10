"use client";

import { motion } from "framer-motion";

type TypewriterTitleProps = {
  text: string;
};

export default function TypewriterTitle({ text }: TypewriterTitleProps) {
  return (
    <h1 className="relative text-center text-4xl font-semibold tracking-[0.16em] text-white sm:text-5xl md:text-6xl">
      <span className="invisible">{text}</span>

      <motion.span
        className="absolute left-0 top-0 whitespace-nowrap"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 1.3,
          ease: "easeInOut",
        }}
        style={{
          overflow: "hidden",
        }}
      >
        {text}
      </motion.span>

      <motion.span
        className="absolute top-1 h-[1em] w-[3px] bg-cyan-300"
        initial={{ left: 0 }}
        animate={{ left: "100%" }}
        transition={{
          duration: 1.3,
          ease: "easeInOut",
        }}
      />
    </h1>
  );
}