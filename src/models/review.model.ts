// src/models/review.model.ts

/**
 * Define una reseña "positiva".
 * Se distingue por la propiedad 'type' con el valor "positive".
 */
type PositiveReview = {
  type: "positive"; 
  message: string; 
};

/**
 * Define una reseña "negativa".
 * Se distingue por la propiedad 'type' con el valor "negative".
 */
type NegativeReview = {
  type: "negative"; 
  message: string; 
};

/**
 * Tipo de Unión Discriminada 'Review'.
 * Una 'Review' puede ser una 'PositiveReview' O una 'NegativeReview'.
 * La propiedad 'type' actúa como el "discriminante".
 */
export type Review = PositiveReview | NegativeReview; 


/**
 * Procesa un objeto 'Review' y devuelve un string formateado
 * basado en su tipo ('positive' o 'negative').
 *
 * @param r La reseña (tipo Review) a procesar.
 * @returns Un string formateado según el tipo de reseña.
 */
export function renderReview(r: Review): string { 
  
  // Usamos un 'switch' sobre la propiedad 'type'.
  // TypeScript es lo suficientemente inteligente como para saber
  // qué propiedades están disponibles dentro de cada 'case'
  // (esto se llama "type narrowing" o estrechamiento de tipo).
  
  switch (r.type) {
    // Si r.type es "positive", TypeScript sabe que 'r'
    // es del tipo 'PositiveReview'.
    case "positive":
      return `Opinión positiva: ${r.message}`; 
    
    // Si r.type es "negative", TypeScript sabe que 'r'
    // es del tipo 'NegativeReview'.
    case "negative":
      return `Opinión negativa: ${r.message}`; 
  }
}

/*
// --- Ejemplo de uso ---
// (Puedes pegar esto en un 'main.tsx' o 'App.tsx' para probar en consola)

const resena1: Review = {
  type: "positive",
  message: "¡Excelente película, muy recomendada!"
};

const resena2: Review = {
  type: "negative",
  message: "No me gustó, la trama era muy lenta."
};

console.log(renderReview(resena1));
// Salida: "Opinión positiva: ¡Excelente película, muy recomendada!"

console.log(renderReview(resena2));
// Salida: "Opinión negativa: No me gustó, la trama era muy lenta."

// Esto daría un error de TypeScript, lo cual es bueno:
// const errorReview: Review = {
//   type: "positive",
//   error: "Esto no va aquí" // Error: 'error' no existe en PositiveReview
// };

*/