// src/models/movie.model.ts

/**
 * Define la estructura de datos para un objeto de Película.
 * Esta interfaz se utiliza para asegurar el tipado estricto en
 * componentes, props y funciones que manejen datos de películas.
 */
export interface Movie {
  
  
  readonly id: number; //  Identificador único de la película (solo lectura).
  name: string; //  Título oficial de la película.
  language: string; //  Idioma original.
  genres: string[]; //  Lista de géneros asociados.
  status: string;  //  Estado de la película (ej: "Ended", "Running").
  rating: { average: number | null };  //  Objeto que contiene la calificación promedio. El promedio puede ser un número o nulo si no hay calificación.
  image?: { medium: string; original: string; };  //  Objeto opcional con URLs de imágenes.
  summary?: string; //  Resumen o sinopsis de la película (opcional). 
  officialSite?: string; //  URL al sitio web oficial (opcional).
}


/**
 * Formatea los datos de una película en una cadena de texto legible.
 *
 * @param m El objeto de película (tipo Movie) a formatear.
 * @returns Una cadena con el formato: "Título (Géneros) - Rating: X/10" 
 */


export function formatMovie(m: Movie): string { 
  // Convierte el array de géneros en un string separado por comas
  // Ejemplo: ["Action", "Crime"] -> "Action, Crime" 
  const genresStr = m.genres.join(', ');

  // Maneja el caso donde el rating puede ser 'null' 
  // Si 'm.rating.average' existe (no es null), muestra el valor,
  // de lo contrario, muestra 'Sin calificación'.
  const ratingStr = m.rating.average 
    ? `${m.rating.average}/10` 
    : 'Sin calificación';

  // Retorna el string final usando plantillas literales
  return `${m.name} (${genresStr}) - Rating: ${ratingStr}`; 
}


/*
// --- Ejemplo de uso (basado en el PDF) ---
// Puedes descomentar este bloque y pegarlo temporalmente en tu
// archivo `src/main.tsx` o `src/App.tsx` (fuera del componente)
// para ver la salida en la consola del navegador.

const movieExample: Movie = {
  id: 2, 
  name: "Person of Interest", 
  language: "English", 
  genres: ["Action", "Crime", "Science-Fiction"], 
  status: "Ended", 
  rating: { average: 8.8 }, 
};

console.log(formatMovie(movieExample));
// Salida esperada:
// "Person of Interest (Action, Crime, Science-Fiction) - Rating: 8.8/10" 

const movieSinRating: Movie = {
  id: 3,
  name: "Película sin Rating",
  language: "Spanish",
  genres: ["Drama"],
  status: "Running",
  rating: { average: null }, // Ejemplo con rating nulo 
};

console.log(formatMovie(movieSinRating));
// Salida esperada:
// "Película sin Rating (Drama) - Rating: Sin calificación"

*/