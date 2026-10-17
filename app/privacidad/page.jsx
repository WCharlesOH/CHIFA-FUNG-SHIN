export const metadata = {
  title: "Política de privacidad | Chifa Fung Shing",
  robots: { index: false },
};

export default function Privacidad() {
  return (
    <main className="mx-auto max-w-[44rem] px-4 py-[96px] text-[17px]">
      <a href="/" className="font-semibold underline decoration-oro decoration-2 underline-offset-4">Volver al inicio</a>
      <h1 className="mt-10 text-[clamp(40px,6vw,64px)]">Política de privacidad</h1>
      <p className="mt-8">
        Chifa Fung Shing no guarda datos personales en este sitio. Cuando haces un pedido o una reserva, el mensaje se abre en tu WhatsApp y
        solo lo recibimos si decides enviarlo. Usamos tu nombre, teléfono y dirección únicamente para atender ese pedido o esa reserva, conforme a
        la Ley N.° 29733 de Protección de Datos Personales.
      </p>
      <p className="mt-5">Para pedir que borremos tus datos, escríbenos por WhatsApp a cualquiera de nuestras sedes.</p>
      <h2 id="reclamaciones" className="mt-16 text-[clamp(32px,4vw,44px)]">Libro de reclamaciones</h2>
      <p className="mt-6">
        Puedes registrar un reclamo o una queja en el Libro de Reclamaciones disponible en cada sede, o pedirnos el formulario virtual por WhatsApp.
      </p>
    </main>
  );
}
