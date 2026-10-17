import { CREDITOS, SEDES, waLink } from "@/lib/data";
import { Sello } from "./Header";

// El nombre construido en bloques: cada letra recortada de su propio rectángulo, alturas distintas, bases alineadas.
const LETRAS = "FUNGSHING".split("");
const ALTURAS = [100, 78, 92, 70, 100, 84, 66, 90, 76];
const TONOS = ["bg-carbon", "bg-imperial-deep", "bg-carbon", "bg-oro", "bg-carbon", "bg-imperial-deep", "bg-oro", "bg-carbon", "bg-imperial-deep"];

export default function Footer() {
  return (
    <footer className="bg-imperial px-4 pt-[96px] pb-8 text-arroz md:px-[8vw] md:pt-[140px]">
      <div aria-label="Fung Shing" role="img" className="flex h-[22svh] items-end gap-1 md:h-[34svh]">
        {LETRAS.map((l, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`${TONOS[i]} ${i === 4 ? "ml-3 md:ml-6" : ""} flex flex-1 items-end justify-center overflow-hidden ${TONOS[i] === "bg-oro" ? "text-carbon" : "text-arroz"}`}
            style={{ height: `${ALTURAS[i]}%`, fontFamily: "var(--font-display)" }}
          >
            <span className="translate-y-[0.12em] text-[12vw] leading-none font-bold">{l}</span>
          </span>
        ))}
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <nav aria-label="Mapa del sitio" className="grid grid-cols-2 gap-8 text-[15px] md:col-span-8 md:grid-cols-4">
          <div>
            <h2 className="mb-3 font-sans text-[17px] font-bold tracking-normal">La carta</h2>
            <ul className="grid gap-2">
              <li><a className="hover:text-oro" href="#carta">Especialidades</a></li>
              <li><a className="hover:text-oro" href="#esencia">Nuestra esencia</a></li>
              <li><a className="hover:text-oro" href="#historia">Historia</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-sans text-[17px] font-bold tracking-normal">Visítanos</h2>
            <ul className="grid gap-2">
              <li><a className="hover:text-oro" href="#sedes">Sedes y horarios</a></li>
              <li><a className="hover:text-oro" href="#reservar">Reservar mesa</a></li>
              <li><a className="hover:text-oro" href={waLink("Hola Fung Shing, quiero hacer un pedido.")}>Delivery</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-sans text-[17px] font-bold tracking-normal">Síguenos</h2>
            <ul className="grid gap-2">
              <li><a className="hover:text-oro" href="https://www.facebook.com/" rel="noopener">Facebook</a></li>
              <li><a className="hover:text-oro" href="https://www.instagram.com/" rel="noopener">Instagram</a></li>
              <li><a className="hover:text-oro" href="https://www.tiktok.com/" rel="noopener">TikTok</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-sans text-[17px] font-bold tracking-normal">Legal</h2>
            <ul className="grid gap-2">
              <li><a className="hover:text-oro" href="/privacidad/">Política de privacidad</a></li>
              <li><a className="hover:text-oro" href="/privacidad/#reclamaciones">Libro de reclamaciones</a></li>
            </ul>
          </div>
        </nav>
        <address className="grid gap-5 text-[15px] not-italic md:col-span-4">
          {SEDES.map((s) => (
            <p key={s.id}>
              <strong className="block text-[17px]">Fung Shing {s.nombre}</strong>
              {s.direccion} · {s.telefono}
            </p>
          ))}
        </address>
      </div>

      <p className="mt-12 max-w-[70rem] text-[15px] text-arroz/85">
        Fotografías del Barrio Chino y del wok, de Wikimedia Commons:{" "}
        {CREDITOS.map((c, i) => (
          <span key={c.url}>
            <a className="underline underline-offset-2 hover:text-oro" href={c.url} rel="noopener">«{c.titulo}»</a>, {c.autor}, {c.licencia}
            {i < CREDITOS.length - 1 ? "; " : "."}
          </span>
        ))}{" "}
        Muestran el mundo del chifa limeño, no nuestro local.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[15px]">
        <p className="flex items-center gap-3">
          <Sello className="size-8" />
          © 2026 Chifa Fung Shing. Guardado por el dragón.
        </p>
        <a href="#inicio" className="rounded-full bg-carbon px-5 py-2.5 font-bold transition-transform hover:scale-105 active:scale-95">
          Volver arriba
        </a>
      </div>
    </footer>
  );
}
