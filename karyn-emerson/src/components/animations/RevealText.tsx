"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RevealTextProps {
  text: string;
  type?: "words" | "chars";
  stagger?: number;
  delay?: number;
  className?: string;
}

export function RevealText({
  text,
  type = "words",
  stagger = 0.04,
  delay = 0,
  className,
}: RevealTextProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const units = type === "words" ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: "easeOut",
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {unit}
          {type === "words" && i < units.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
