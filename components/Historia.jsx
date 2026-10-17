"use client";

import { asset } from "@/lib/base";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

export default function Historia() {
  const reduce = useReducedMotion();
  return (
    <section id="historia" className="bg-arroz p-[10px] md:p-5">
      <div className="relative overflow-hidden bg-imperial px-5 pt-14 text-arroz lg:min-h-[110svh] md:px-14 md:pt-14">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal as="h2" className="text-[10vw] md:text-[clamp(48px,5vw,72px)]">
              La llama viva
              <br />
              del wok
            </Reveal>
          </div>
          <div className="mt-10 grid max-w-[34rem] gap-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <Reveal orden={1}>
              <h3 className="text-[32px]">Herencia de la Calle Capón</h3>
              <p className="mt-3 text-[17px]">
                El chifa nació en el Barrio Chino de Lima, cuando la cocina cantonesa se encontró con el ají, el limón y el kion de aquí. De ese cruce viene nuestra receta, y la servimos con orgullo.
              </p>
            </Reveal>
            <Reveal orden={2}>
              <h3 className="text-[32px]">Saltado al momento</h3>
              <p className="mt-3 text-[17px]">
                Ningún plato espera. Cada chaufa pasa por el wok a fuego alto: ese humo tostado, el wok hei, es el sabor que reconoces al primer bocado.
              </p>
            </Reveal>
            <Reveal orden={3}>
              <a
                href="#reservar"
                className="inline-block rounded-full bg-oro px-7 py-4 text-[17px] font-bold text-carbon transition-transform duration-200 hover:scale-[1.04] active:scale-95"
              >
                Reservar mesa
              </a>
            </Reveal>
          </div>
        </div>

        {/* La foto en la perla: se abre como un iris (movimiento firma) */}
        <figure className="relative mx-auto mt-14 w-[86vw] translate-y-[25%] md:w-[60vw] lg:absolute lg:bottom-0 lg:left-14 lg:mt-0 lg:w-[44vw] lg:translate-y-[18%]">
          <motion.div
            data-reveal
            className="perla aspect-square bg-imperial-deep"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)" }}
            whileInView={reduce ? { opacity: 1 } : { clipPath: "circle(50% at 50% 50%)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={asset("/assets/wok-fuego.jpg")}
              alt="Un wok sobre la llama, con el fuego subiendo por sus bordes"
              width="1920"
              height="1252"
              loading="lazy"
              className="h-full w-full object-cover object-[62%_50%]"
              initial={reduce ? false : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </figure>
      </div>
    </section>
  );
}
