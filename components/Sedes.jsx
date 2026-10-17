"use client";

import { asset } from "@/lib/base";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { SEDES, waLink } from "@/lib/data";

// Día de la semana (0 = domingo) y minutos desde medianoche, en hora de Lima.
function ahoraEnLima() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => partes.find((p) => p.type === t).value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dia, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

const aMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function estado(sede) {
  const { dia, min } = ahoraEnLima();
  const tramo = dia === 0 ? sede.horario[2] : dia >= 5 ? sede.horario[1] : sede.horario[0];
  const abre = aMin(tramo.abre);
  const cierra = aMin(tramo.cierra);
  if (min >= abre && min < cierra) {
    const faltan = cierra - min;
    return { abierto: true, texto: faltan <= 60 ? `Abierto: cierra en ${faltan} min` : `Abierto ahora, hasta las ${tramo.cierra}` };
  }
  return { abierto: false, texto: min < abre ? `Cerrado: abre hoy a las ${tramo.abre}` : "Cerrado: abre mañana a las 12:00" };
}

export function LocationCard({ sede, orden, invertir = false }) {
  const [ahora, setAhora] = useState(null);
  useEffect(() => {
    const t = () => setAhora(estado(sede));
    t();
    const id = setInterval(t, 60_000);
    return () => clearInterval(id);
  }, [sede]);

  const q = encodeURIComponent(sede.mapa);
  return (
    <Reveal orden={orden} as="article" className="grid gap-8 md:grid-cols-2 md:gap-10">
      <div className={`perla aspect-square bg-humo ${invertir ? "md:order-2" : ""}`}>
        <iframe
          title={`Mapa de la sede ${sede.nombre}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full grayscale-[0.4]"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-[28px] md:text-[32px]">{sede.nombre}</h3>
        <p className="mt-3 text-[20px] font-semibold">{sede.direccion}</p>
        <p className="text-[17px] text-arroz/80">{sede.referencia}</p>
        <p className="mt-4 flex items-center gap-3 text-[17px] font-semibold" aria-live="polite">
          <span className={`perla inline-block size-3.5 ${ahora?.abierto ? "bg-oro-vivo" : "bg-imperial"}`} aria-hidden="true" />
          {ahora ? ahora.texto : "Todos los días desde las 12:00"}
        </p>
        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[17px]">
          {sede.horario.map((h) => (
            <div key={h.dias} className="contents">
              <dt className="text-arroz/80">{h.dias}</dt>
              <dd className="tabular-nums">{h.abre} – {h.cierra}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={waLink(`Hola Fung Shing ${sede.nombre}, quiero hacer un pedido.`)}
            className="rounded-full bg-oro px-6 py-3.5 text-[17px] font-bold text-carbon transition-transform hover:scale-[1.04] active:scale-95"
          >
            Pedir por WhatsApp
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-humo px-6 py-3.5 text-[17px] font-bold transition-colors hover:bg-imperial"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Sedes() {
  return (
    <section id="sedes" className="bg-carbon px-4 pt-[60px] pb-[140px] md:px-[8vw] md:pb-[200px]">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal as="h2" className="text-[10vw] md:text-[clamp(48px,5vw,72px)] lg:col-span-7">
          Dos sedes,
          <br />
          el mismo fuego
        </Reveal>
        <Reveal orden={1} className="flex items-center gap-5 lg:col-span-5">
          <span className="perla block size-28 shrink-0 md:size-36">
            <img src={asset("/assets/capon-pagoda.jpg")} alt="Portal de tejas verdes y columnas rojas en la entrada de la calle Capón, Lima" width="1920" height="1440" loading="lazy" className="h-full w-full object-cover object-[62%_40%]" />
          </span>
          <p className="text-[17px]">Delivery a La Molina, San Luis y distritos vecinos. Salón familiar y privados para grupos.</p>
        </Reveal>
      </div>
      <div className="mt-[96px] grid gap-[120px]">
        {SEDES.map((s, i) => (
          <LocationCard key={s.id} sede={s} orden={0} invertir={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
