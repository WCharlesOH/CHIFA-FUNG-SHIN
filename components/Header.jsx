import { waLink } from "@/lib/data";

export function Sello({ className = "" }) {
  // El sello: la perla dentro del disco imperial.
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="var(--color-imperial)" />
      <path d="M 30 30 C 24 36, 12 34, 12 26 C 12 18, 26 20, 28 12 C 29 7, 22 5, 17 9" fill="none" stroke="var(--color-oro)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="11" cy="11" r="4" fill="var(--color-oro-vivo)" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav aria-label="Principal" className="flex items-center justify-between gap-4 px-4 py-5 md:px-[4vw] md:py-7">
        <a href="#inicio" className="flex items-center gap-3 whitespace-nowrap text-[22px] font-bold tracking-tight md:text-[28px]" style={{ fontFamily: "var(--font-display)" }}>
          <Sello className="size-9 md:size-11" />
          Fung Shing
        </a>
        <div className="flex items-center gap-5 md:gap-9">
          <ul className="hidden items-center gap-8 text-[17px] font-semibold lg:flex">
            <li><a className="transition-colors hover:text-oro" href="#inicio">Inicio</a></li>
            <li><a className="transition-colors hover:text-oro" href="#carta">Especialidades</a></li>
            <li><a className="transition-colors hover:text-oro" href="#sedes">Sedes</a></li>
            <li><a className="transition-colors hover:text-oro" href="#reservar">Reservar</a></li>
          </ul>
          <a href="#carta" className="text-[17px] font-semibold lg:hidden">Carta</a>
          <a
            href={waLink("Hola Fung Shing, quiero hacer un pedido de delivery.")}
            className="whitespace-nowrap rounded-full bg-oro px-4 py-3 text-[15px] font-bold text-carbon transition-transform duration-200 hover:scale-[1.04] active:scale-95 md:px-6 md:text-[17px]"
          >
            Pedir delivery
          </a>
        </div>
      </nav>
    </header>
  );
}
