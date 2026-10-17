"use client";

import { motion, useReducedMotion } from "framer-motion";
import Dragon from "./Dragon";
import { waLink } from "@/lib/data";

export default function HeroSection() {
  const reduce = useReducedMotion();
  const entra = (i) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.25 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-carbon">
      {/* El dragón de Fung Shing enroscado sobre el logo, a la derecha (abajo en móvil) */}
      <div className="pointer-events-none absolute -z-10 w-[130vw] max-md:left-1/2 max-md:top-[54svh] max-md:-translate-x-1/2 md:right-[-6vw] md:top-1/2 md:w-[min(60vw,150vh)] md:-translate-y-1/2">
        <Dragon className="w-full" />
      </div>

      <div className="flex min-h-[100svh] flex-col justify-start px-4 pt-[17svh] md:justify-center md:px-[8vw] md:pt-16">
        <motion.h1 {...entra(0)} className="max-w-[46rem] text-[8.6vw] md:text-[clamp(44px,4.7vw,84px)]">
          <span className="block whitespace-nowrap">El poder del wok,</span>
          <span className="block whitespace-nowrap">la leyenda del dragón</span>
        </motion.h1>
        <motion.p {...entra(1)} className="mt-6 max-w-[30rem] text-[17px] leading-relaxed md:mt-8 md:text-[20px]">
          Chaufa, tallarín saltado y kam lu wantán hechos al momento, a fuego alto. En nuestro salón o en tu casa.
        </motion.p>
        <motion.div {...entra(2)} className="mt-8 flex flex-wrap items-center gap-6 md:mt-10">
          <a
            href={waLink("Hola Fung Shing, quiero hacer un pedido.")}
            className="anillo-latido rounded-full bg-oro px-7 py-4 text-[17px] font-bold text-carbon transition-transform duration-200 hover:scale-[1.04] active:scale-95"
          >
            Pedir por WhatsApp
          </a>
          <a href="#carta" className="text-[17px] font-semibold underline decoration-oro decoration-2 underline-offset-[6px] transition-colors hover:text-oro">
            Ver la carta
          </a>
        </motion.div>
      </div>
    </section>
  );
}
