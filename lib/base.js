// Prefijo de la ruta en GitHub Pages (p. ej. "/CHIFA-FUNG-SHIN"); vacío en local o con dominio propio.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Antepone el prefijo a rutas de /public y enlaces internos que no pasan por next/link.
export const asset = (ruta) => `${BASE_PATH}${ruta}`;
