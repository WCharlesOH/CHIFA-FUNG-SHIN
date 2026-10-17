"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { SEDES, waLink } from "@/lib/data";

const campo =
  "h-[54px] w-full rounded-full bg-imperial-deep px-5 text-[17px] text-arroz placeholder:text-arroz/70 [color-scheme:dark]";

// La reserva como un cupón para recortar: muescas circulares y perforación de puntos.
export default function ReservaCupon() {
  const [datos, setDatos] = useState({ nombre: "", sede: SEDES[0].id, fecha: "", personas: "2" });
  const set = (k) => (e) => setDatos((d) => ({ ...d, [k]: e.target.value }));

  const enviar = (e) => {
    e.preventDefault();
    const sede = SEDES.find((s) => s.id === datos.sede);
    const fecha = datos.fecha
      ? new Date(datos.fecha).toLocaleString("es-PE", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
      : "(por definir)";
    const texto = `Hola Fung Shing ${sede.nombre}, quiero reservar una mesa.\nNombre: ${datos.nombre}\nPersonas: ${datos.personas}\nFecha y hora: ${fecha}`;
    window.open(waLink(texto), "_blank", "noopener");
  };

  return (
    <section id="reservar" className="bg-carbon px-3 pb-[140px] md:px-[8vw] md:pb-[200px]">
      <Reveal className="cupon relative mx-auto max-w-[1100px] bg-imperial text-arroz md:grid md:grid-cols-[46%_54%]">
        <div className="flex flex-col justify-between gap-6 p-7 md:p-8 lg:p-12">
          <h2 className="whitespace-nowrap text-[10vw] md:text-[clamp(48px,5vw,72px)]">
            Reserva tu
            <br />
            mesa
          </h2>
          <p className="max-w-[24rem] text-[17px]">
            Completa el cupón y se abre WhatsApp con tu reserva escrita. Te confirmamos desde la sede. Para grupos de más de diez, pide un privado.
          </p>
        </div>
        <form onSubmit={enviar} className="perforacion grid gap-2.5 p-7 md:p-8 lg:p-12">
          <label className="sr-only" htmlFor="r-nombre">Nombre</label>
          <input id="r-nombre" required autoComplete="name" placeholder="Tu nombre" value={datos.nombre} onChange={set("nombre")} className={campo} />
          <label className="sr-only" htmlFor="r-sede">Sede</label>
          <select id="r-sede" value={datos.sede} onChange={set("sede")} className={campo}>
            {SEDES.map((s) => (
              <option key={s.id} value={s.id}>Sede {s.nombre}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="r-fecha">Fecha y hora</label>
          <input id="r-fecha" required type="datetime-local" value={datos.fecha} onChange={set("fecha")} className={campo} />
          <label className="sr-only" htmlFor="r-personas">Personas</label>
          <select id="r-personas" value={datos.personas} onChange={set("personas")} className={campo}>
            {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n} value={n}>{n} {n === "1" ? "persona" : "personas"}</option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-2 h-14 rounded-full bg-carbon text-[17px] font-bold text-arroz transition-[transform,background-color] duration-200 hover:bg-humo active:scale-[0.98]"
          >
            Enviar reserva por WhatsApp
          </button>
        </form>
      </Reveal>
    </section>
  );
}
