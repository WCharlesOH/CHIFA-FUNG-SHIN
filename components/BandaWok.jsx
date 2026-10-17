"use client";

import { asset } from "@/lib/base";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

// La banda que parte la página en dos: el wok en movimiento, dentro de la perla.
export default function BandaWok() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="El wok en acción" className="overflow-hidden bg-carbon px-4 pt-[180px] pb-[120px] md:px-[8vw] md:pt-[240px] md:pb-[180px]">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="perla relative aspect-square lg:col-span-6">
          <video
            className="h-full w-full object-cover object-[45%_50%]"
            src={asset("/assets/wok-video.webm")}
            poster={asset("/assets/wok-video-poster.jpg")}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="none"
            aria-label="Un cocinero salta verduras en el wok sobre la llama"
          />
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal as="h2" orden={1} className="text-[10vw] md:text-[clamp(48px,5vw,72px)]">
            Fuego alto,
            <br />
            muñeca firme
          </Reveal>
          <Reveal as="p" orden={2} className="mt-6 max-w-[28rem] text-[17px] md:text-[20px]">
            El arroz salta, el sillao se carameliza contra el hierro y la cebolla china entra al final. Así se hace un chaufa, y así lo hacemos cada vez.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
