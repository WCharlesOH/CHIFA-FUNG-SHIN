"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { CATEGORIAS, SEDES, TODOS_LOS_PLATOS, precio, waLink } from "@/lib/data";

const FILTROS = [{ id: "todo", nombre: "Toda la carta" }, ...CATEGORIAS.map(({ id, nombre }) => ({ id, nombre }))];

function Plato({ plato, cantidad, onSumar, onRestar }) {
  return (
    <li className="flex gap-5">
      {/* la perla es el botón: + para añadir, el número cuando ya está en tu pedido */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <button
          type="button"
          onClick={onSumar}
          aria-label={cantidad ? `Añadir otro ${plato.nombre} (llevas ${cantidad})` : `Añadir ${plato.nombre} al pedido`}
          className={`perla grid size-14 place-items-center text-[20px] font-bold transition-[transform,background-color,color] duration-200 hover:scale-105 active:scale-90 ${
            cantidad ? "bg-imperial text-arroz" : "bg-arroz-tono text-imperial hover:bg-oro hover:text-carbon"
          }`}
        >
          {cantidad || "+"}
        </button>
        {cantidad > 0 && (
          <button
            type="button"
            onClick={onRestar}
            aria-label={`Quitar un ${plato.nombre}`}
            className="text-[15px] font-semibold underline underline-offset-4 hover:text-imperial"
          >
            Quitar
          </button>
        )}
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-[20px] font-bold leading-snug">{plato.nombre}</h4>
          <span className="shrink-0 text-[17px] font-semibold tabular-nums">{precio(plato.precio)}</span>
        </div>
        <p className="mt-1 max-w-[42ch] text-[17px] leading-normal text-carbon/80">
          {plato.desc}
          {plato.nota && <strong className="font-semibold text-imperial"> {plato.nota}.</strong>}
        </p>
      </div>
    </li>
  );
}

export default function MenuSection() {
  const reduce = useReducedMotion();
  const [filtro, setFiltro] = useState("todo");
  const [pedido, setPedido] = useState({});
  const [sede, setSede] = useState(SEDES[0].id);

  const lineas = useMemo(
    () => TODOS_LOS_PLATOS.filter((p) => pedido[p.id]).map((p) => ({ ...p, cantidad: pedido[p.id] })),
    [pedido]
  );
  const unidades = lineas.reduce((n, l) => n + l.cantidad, 0);
  const total = lineas.reduce((n, l) => n + l.cantidad * l.precio, 0);

  const cambiar = (id, d) =>
    setPedido((p) => {
      const n = Math.max(0, (p[id] || 0) + d);
      const copia = { ...p };
      if (n) copia[id] = n;
      else delete copia[id];
      return copia;
    });

  const mensaje = () => {
    const s = SEDES.find((x) => x.id === sede);
    return [
      `Hola Fung Shing ${s.nombre}, quiero pedir:`,
      ...lineas.map((l) => `• ${l.cantidad} × ${l.nombre} (${precio(l.precio * l.cantidad)})`),
      `Total: ${precio(total)}`,
      "Mi dirección de entrega es: ",
    ].join("\n");
  };

  const visibles = filtro === "todo" ? CATEGORIAS : CATEGORIAS.filter((c) => c.id === filtro);

  return (
    <section id="carta" className="bg-arroz px-4 pb-[140px] text-carbon md:px-[8vw] md:pb-[200px]">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <Reveal as="h2" className="text-[10vw] md:text-[clamp(48px,5vw,72px)] lg:col-span-7">
          La carta del dragón
        </Reveal>
        <Reveal as="p" orden={1} className="max-w-[34rem] text-[17px] lg:col-span-5 lg:pb-3">
          Toca el <strong>+</strong> de lo que se te antoje. Armamos el mensaje y lo envías por WhatsApp a la sede que elijas.
        </Reveal>
      </div>

      {/* filtros: fila pegajosa en el teléfono */}
      <div className="sticky top-0 z-20 -mx-4 mt-10 bg-arroz px-4 py-3 md:static md:mx-0 md:mt-14 md:px-0">
        <div role="tablist" aria-label="Categorías de la carta" className="flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              className={`rounded-full px-4 py-2.5 text-[15px] md:px-5 md:py-3 md:text-[17px] font-semibold transition-colors duration-200 ${
                filtro === f.id ? "bg-imperial text-arroz" : "bg-arroz-tono text-carbon hover:bg-oro"
              }`}
            >
              {f.nombre}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {visibles.map((cat) => (
          <motion.div
            key={cat.id}
            layout={!reduce}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-[72px] md:mt-[96px]"
          >
            <div className="mb-10 flex items-baseline justify-between gap-4">
              <h3 className="text-[28px] md:text-[32px]">{cat.nombre}</h3>
              <span className="text-[17px] font-semibold">{cat.platos.length} platos</span>
            </div>
            <ul className="grid gap-x-16 gap-y-10 md:grid-cols-2">
              {cat.platos.map((p) => (
                <Plato key={p.id} plato={p} cantidad={pedido[p.id] || 0} onSumar={() => cambiar(p.id, 1)} onRestar={() => cambiar(p.id, -1)} />
              ))}
            </ul>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* la bandeja: el pedido en vivo */}
      <AnimatePresence>
        {unidades > 0 && (
          <motion.aside
            aria-label="Tu pedido"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={"fixed inset-x-3 bottom-3 z-40 rounded-[28px] bg-carbon p-4 text-arroz shadow-[0_18px_50px_rgba(0,0,0,0.45)] md:inset-x-auto md:right-6 md:bottom-6 md:w-[420px] md:p-5" /* taste-skill-ignore: bandeja flotante */}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[17px]">
                <strong className="text-oro">{unidades}</strong> {unidades === 1 ? "plato" : "platos"} · <strong className="tabular-nums">{precio(total)}</strong>
              </p>
              <button type="button" onClick={() => setPedido({})} className="text-[15px] font-semibold underline underline-offset-4 hover:text-oro">
                Vaciar
              </button>
            </div>
            <p className="mt-1 line-clamp-1 text-[15px] text-arroz/75">{lineas.map((l) => `${l.cantidad} ${l.nombre}`).join(", ")}</p>
            <div className="mt-3 flex gap-2">
              <label className="sr-only" htmlFor="sede-pedido">Sede</label>
              <select
                id="sede-pedido"
                value={sede}
                onChange={(e) => setSede(e.target.value)}
                className="rounded-full bg-humo px-4 py-3 text-[15px] font-semibold text-arroz"
              >
                {SEDES.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
              <a
                href={waLink(mensaje())}
                target="_blank"
                rel="noopener"
                className="flex-1 rounded-full bg-oro px-4 py-3 text-center text-[17px] font-bold text-carbon transition-transform hover:scale-[1.02] active:scale-95"
              >
                Enviar por WhatsApp
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}
