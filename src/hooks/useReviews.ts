// src/hooks/useReviews.ts

import { useState, useCallback } from 'react';
// Importamos el tipo 'Review' que definimos en el Paso 8 
import type { Review } from '../models/review.model.ts';

/**
 * Define la estructura del objeto que devuelve el hook useReviews.
 */
interface UseReviewsReturn {
  /**
   * El arreglo actual de reseñas (tipo Review[]).
   */
  reviews: Review[]; 

  /**
   * Función para agregar una nueva reseña positiva.
   * Recibe el mensaje (string) de la reseña.
   */
  addPositiveReview: (message: string) => void; 

  /**
   * Función para agregar una nueva reseña negativa.
   * Recibe el mensaje (string) de la reseña.
   */
  addNegativeReview: (message: string) => void; 
}

/**
 * Hook personalizado para gestionar un arreglo de reseñas.
 * Proporciona el estado (reviews) y las funciones para
 * modificarlo (addPositiveReview, addNegativeReview). 
 *
 * @returns Un objeto con { reviews, addPositiveReview, addNegativeReview } 
 */
export const useReviews = (): UseReviewsReturn => {

  // ---- ESTADO ----
  // Usamos 'useState' para almacenar el arreglo de reseñas.
  // Inicia como un arreglo vacío. 
  const [reviews, setReviews] = useState<Review[]>([]);

  // ---- FUNCIONES DE ACTUALIZACIÓN ----
  
  /**
   * Hook 'useCallback'.
   * "Memoriza" la definición de esta función. Esto asegura que la
   * función 'addPositiveReview' no se vuelva a crear en cada
   * renderizado, lo cual es una optimización para los componentes
   * que la usen.
   */
  const addPositiveReview = useCallback((message: string) => { 
    // Creamos el nuevo objeto de reseña
    const newReview: Review = {
      type: "positive", // 
      message: message
    };

    // Actualizamos el estado usando la forma funcional de 'setState'.
    // 'prevReviews' es el arreglo de reseñas anterior.
    // Retornamos un *nuevo* arreglo con la nueva reseña al final.
    setReviews(prevReviews => [...prevReviews, newReview]);
  }, []); // El '[]' (arreglo vacío) significa que esta función NUNCA cambiará.

  /**
   * Función memorizada para agregar una reseña negativa. 
   */
  const addNegativeReview = useCallback((message: string) => {
    const newReview: Review = {
      type: "negative", // 
      message: message
    };
    
    // Añadimos la nueva reseña al estado
    setReviews(prevReviews => [...prevReviews, newReview]);
  }, []); // Dependencias vacías, la función no necesita recrearse.

  // ---- RETORNO ----
  // Devolvemos el estado y las funciones para que
  // cualquier componente pueda usarlas. 
  return {
    reviews,
    addPositiveReview,
    addNegativeReview
  };
};

/*
// --- Ejemplo de uso ---
// Así es como un componente (como el que haremos en el Paso 10)
// usaría este hook:

function MiComponenteDeResenas() {
  // 1. Llamamos al hook
  const { reviews, addPositiveReview, addNegativeReview } = useReviews(); 
  
  // ( ... lógica para un formulario ... )
  
  const handleSubmitPositivo = () => {
    addPositiveReview("¡Me encantó!"); 
  }
  
  const handleSubmitNegativo = () => {
    addNegativeReview("No fue buena."); 
  }

  // 2. Renderizamos las reseñas
  return (
    <div>
      <button onClick={handleSubmitPositivo}>Añadir Positiva</button>
      <button onClick={handleSubmitNegativo}>Añadir Negativa</button>
      
      <ul>
        {reviews.map((r, index) => (
          // 'renderReview' es la función que creamos en el Paso 8 
          <li key={index}>{renderReview(r)}</li>
        ))}
      </ul>
    </div>
  );
}

*/