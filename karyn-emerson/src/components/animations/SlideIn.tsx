"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  distance = 40,
  className,
}: SlideInProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const offset = direction === "left" ? -distance : distance;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
