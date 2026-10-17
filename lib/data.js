// Contenido de muestra: números, direcciones y precios deben confirmarse con el restaurante antes del lanzamiento.

export const WHATSAPP = "51999999999";

export function waLink(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export const SEDES = [
  {
    id: "la-molina",
    nombre: "La Molina",
    direccion: "Av. Raúl Ferrero 1190, La Molina",
    referencia: "Frente al parque de la cuadra 11",
    telefono: "(01) 479-0000",
    mapa: "Chifa Fung Shing La Molina Lima",
    horario: [
      { dias: "Lunes a jueves", abre: "12:00", cierra: "22:30" },
      { dias: "Viernes y sábado", abre: "12:00", cierra: "23:30" },
      { dias: "Domingo y feriados", abre: "12:00", cierra: "22:00" },
    ],
  },
  {
    id: "san-luis",
    nombre: "San Luis",
    direccion: "Av. San Luis 2050, San Luis",
    referencia: "A dos cuadras de la Av. Javier Prado",
    telefono: "(01) 326-0000",
    mapa: "Chifa Fung Shing San Luis Lima",
    horario: [
      { dias: "Lunes a jueves", abre: "12:00", cierra: "22:30" },
      { dias: "Viernes y sábado", abre: "12:00", cierra: "23:30" },
      { dias: "Domingo y feriados", abre: "12:00", cierra: "22:00" },
    ],
  },
];

export const CATEGORIAS = [
  {
    id: "entradas",
    nombre: "Entradas",
    platos: [
      { id: "wantan-frito", nombre: "Wantán frito", precio: 18, desc: "Doce wantanes crujientes rellenos de cerdo, con salsa de tamarindo para mojar." },
      { id: "siu-mai", nombre: "Siu mai al vapor", precio: 20, desc: "Seis bocaditos de cerdo y langostino en masa fina, servidos en su canasta de bambú." },
      { id: "enrollado", nombre: "Enrollado primavera", precio: 16, desc: "Cuatro rollos de verduras salteadas y pollo, fritos hasta quedar dorados." },
      { id: "alitas-kam-lu", nombre: "Alitas kam lu", precio: 24, desc: "Alitas fritas bañadas en salsa agridulce con piña y pimiento.", nota: "Contiene sésamo" },
      { id: "pan-chino", nombre: "Pan al vapor de chancho asado", precio: 15, desc: "Tres panes suaves rellenos de char siu, el chancho asado de la casa." },
      { id: "langostinos-ajo", nombre: "Langostinos al ajo", precio: 32, desc: "Langostinos saltados con ajo dorado, cebolla china y un toque de kion.", nota: "Contiene mariscos" },
    ],
  },
  {
    id: "wok",
    nombre: "Saltados al wok",
    platos: [
      { id: "chaufa-especial", nombre: "Arroz chaufa especial", precio: 32, desc: "Chancho asado, pollo, langostino y huevo, saltados con cebolla china y sillao a fuego alto." },
      { id: "tallarin-saltado", nombre: "Tallarín saltado", precio: 30, desc: "Tallarín fresco con pollo, kion, frejolito chino y salsa de ostión." },
      { id: "chaufa-mariscos", nombre: "Chaufa de mariscos", precio: 36, desc: "Arroz al wok con calamar, langostino y conchas, perfumado con aceite de ajonjolí.", nota: "Contiene mariscos" },
      { id: "lomo-saltado", nombre: "Lomo saltado chifa", precio: 42, desc: "Lomo fino, cebolla, tomate y ají amarillo con salsa de ostión, con arroz blanco." },
      { id: "tallarin-curry", nombre: "Tallarín con carne al curry", precio: 34, desc: "Tallarín grueso con tiras de res en salsa de curry suave y pimientos." },
      { id: "chaufa-aeropuerto", nombre: "Aeropuerto", precio: 34, desc: "Chaufa y tallarín saltado juntos en un solo plato, con tortilla de huevo encima." },
    ],
  },
  {
    id: "sopas",
    nombre: "Sopas",
    platos: [
      { id: "sopa-wantan", nombre: "Sopa wantán especial", precio: 26, desc: "Caldo de gallina con wantanes, chancho asado, pollo, verduras y huevo de codorniz." },
      { id: "fuchifu", nombre: "Sopa fuchifu", precio: 18, desc: "Caldo claro con huevo batido en hilos, pollo deshilachado y cebolla china." },
      { id: "sopa-choclo", nombre: "Sopa de choclo con pollo", precio: 20, desc: "Crema ligera de choclo peruano con pollo y clara de huevo." },
      { id: "sam-sen", nombre: "Sopa sam sen", precio: 28, desc: "Tres sabores: pollo, langostino y chancho asado en caldo con verduras chinas.", nota: "Contiene mariscos" },
    ],
  },
  {
    id: "casa",
    nombre: "De la casa",
    platos: [
      { id: "kam-lu-wantan", nombre: "Kam lu wantán", precio: 38, desc: "Wantanes fritos con chancho asado, langostinos, piña y pimientos en salsa kam lu." },
      { id: "tipakay", nombre: "Tipakay", precio: 34, desc: "Trozos de pollo fritos y crujientes en salsa de tamarindo dulce con ajonjolí.", nota: "Contiene sésamo" },
      { id: "chi-jau-kay", nombre: "Chi jau kay", precio: 34, desc: "Pollo frito con salsa de ostión, sillao y cebolla china, sobre lechuga fresca." },
      { id: "pato-asado", nombre: "Medio pato asado", precio: 58, desc: "Pato laqueado al horno, piel crocante, con su salsa de ciruela." },
      { id: "costillas-vinagre", nombre: "Costillas al vinagre", precio: 40, desc: "Costillas de cerdo glaseadas en vinagre de arroz y azúcar rubia." },
      { id: "taypa", nombre: "Taypa a la plancha", precio: 64, desc: "Mixto de carnes, mariscos y verduras servido humeante en plancha de hierro.", nota: "Para dos" },
    ],
  },
];

export const TODOS_LOS_PLATOS = CATEGORIAS.flatMap((c) => c.platos);

export const CREDITOS = [
  { titulo: "Entrada al barrio chino en Lima", autor: "lilapagola", licencia: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/w/index.php?curid=52757651" },
  { titulo: "Calle Capón Pagoda, Lima", autor: "David Berkowitz", licencia: "CC BY 2.0", url: "https://commons.wikimedia.org/w/index.php?curid=95257685" },
  { titulo: "Wok cooking and fire", autor: "romainguy", licencia: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/w/index.php?curid=1763765" },
  { titulo: "Miseplace chifa", autor: "MiguelAlanCS", licencia: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/w/index.php?curid=84407437" },
  { titulo: "Placa Calle Capón", autor: "Miguel Angel Chong", licencia: "CC BY 3.0", url: "https://commons.wikimedia.org/w/index.php?curid=9864172" },
  { titulo: "Vidéo de wok (Sunsep, Beynost)", autor: "Benoît Prieur", licencia: "CC0", url: "https://commons.wikimedia.org/wiki/File:Vid%C3%A9o_de_wok_(Sunsep,_Beynost).webm" },
];

const soles = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });
export const precio = (n) => soles.format(n);
