import Reveal from "./Reveal";

function Mini({ src, alt, pos = "center" }) {
  return (
    <span className="perla mx-[0.12em] inline-block h-[0.85em] w-[1.15em] align-[-0.1em] bg-arroz-tono">
      <img src={src} alt={alt} width="120" height="90" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: pos }} />
    </span>
  );
}

export default function Esencia() {
  return (
    <section id="esencia" aria-label="Nuestra esencia" className="bg-arroz px-4 pt-[96px] pb-[140px] text-carbon md:px-[8vw] md:pt-[160px] md:pb-[200px]">
      <Reveal
        as="p"
        className="max-w-[56rem] text-[24px] font-semibold leading-[1.2] tracking-[-0.015em] md:text-[32px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Del portal <Mini src="/assets/barrio-chino-portada.jpg" alt="Portada del Barrio Chino de Lima" pos="40% 30%" /> del Barrio Chino a tu mesa: herencia cantonesa, fuego de wok{" "}
        <Mini src="/assets/wok-fuego.jpg" alt="Llamas bajo un wok" pos="70% 50%" /> y sazón peruano{" "}
        <Mini src="/assets/mise-en-place.jpg" alt="Ingredientes picados listos para el wok" pos="50% 60%" /> en cada plato.
      </Reveal>

      {/* El barrio donde nació el chifa: dos perlas de escala muy distinta */}
      <div className="mt-[72px] grid items-end gap-10 md:mt-[120px] md:grid-cols-12 md:gap-8">
        <Reveal as="figure" orden={1} className="md:col-span-7">
          <div className="perla aspect-square bg-arroz-tono">
            <img
              src="/assets/barrio-chino-portada.jpg"
              alt="La portada roja del Barrio Chino de Lima, con gente caminando por la calle Capón"
              width="1920"
              height="1440"
              loading="lazy"
              className="h-full w-full object-cover object-[45%_40%]"
            />
          </div>
          <figcaption className="mt-4 text-[15px]">La portada del Barrio Chino, en el Centro de Lima. Foto: lilapagola, CC BY-SA 3.0.</figcaption>
        </Reveal>
        <div className="grid gap-10 md:col-span-4 md:col-start-9">
          <Reveal as="figure" orden={2} className="w-[60%] md:w-[80%]">
            <div className="perla aspect-square bg-arroz-tono">
              <img
                src="/assets/placa-capon.jpg"
                alt="Placa de bronce de la Calle Capón con un dragón sobre las palabras Barrio Chino"
                width="1500"
                height="2000"
                loading="lazy"
                className="h-full w-full object-cover object-[45%_45%]"
              />
            </div>
            <figcaption className="mt-4 text-[15px]">El dragón de bronce de la Calle Capón. Foto: Miguel Angel Chong, CC BY 3.0.</figcaption>
          </Reveal>
          <Reveal as="p" orden={3} className="text-[17px]">
            Hace más de un siglo, las fondas cantonesas de la calle Capón empezaron a cocinar con lo que daba el mercado de Lima. Así nació el chifa. Fung Shing guarda ese oficio: wok de hierro, fuego alto y sazón de casa.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
