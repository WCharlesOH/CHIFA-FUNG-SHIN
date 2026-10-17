import { Noto_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SEDES, WHATSAPP } from "@/lib/data";
import "./globals.css";

const display = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const SITE = "https://chifafungshing.pe";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Chifa Fung Shing | Chifa al wok en La Molina y San Luis, Lima",
  description:
    "Arroz chaufa, tallarín saltado, kam lu wantán y tipakay saltados al wok. Chifa Fung Shing: delivery por WhatsApp y reservas en La Molina y San Luis, Lima.",
  keywords: ["chifa", "chifa La Molina", "chifa San Luis", "arroz chaufa", "delivery chifa Lima", "comida peruano china"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE,
    siteName: "Chifa Fung Shing",
    title: "Chifa Fung Shing: el poder del wok, la leyenda del dragón",
    description: "Chifa al wok en Lima. Pide por WhatsApp o reserva tu mesa.",
    images: [{ url: "/assets/wok-fuego.jpg", width: 1920, height: 1252 }],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  themeColor: "#121212",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": SEDES.map((s) => ({
    "@type": "Restaurant",
    "@id": `${SITE}/#${s.id}`,
    name: `Chifa Fung Shing ${s.nombre}`,
    servesCuisine: ["Chifa", "Peruano-china", "Cantonesa"],
    priceRange: "S/ 15 – S/ 64",
    telephone: s.telefono,
    url: SITE,
    menu: `${SITE}/#carta`,
    acceptsReservations: true,
    image: `${SITE}/assets/wok-fuego.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.direccion.split(",")[0],
      addressLocality: s.nombre,
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    potentialAction: {
      "@type": "OrderAction",
      target: `https://wa.me/${WHATSAPP}`,
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "12:00", closes: "22:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "12:00", closes: "23:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "22:00" },
    ],
  })),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE" className={`${display.variable} ${sans.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
