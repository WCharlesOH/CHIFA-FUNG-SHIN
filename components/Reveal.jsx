"use client";

import { motion, useReducedMotion } from "framer-motion";

// Entrada de cada parte de una sección: sube 24px y aparece, una vez, escalonada por `orden`.
export default function Reveal({ as = "div", orden = 0, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      data-reveal
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay: orden * 0.08, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}
