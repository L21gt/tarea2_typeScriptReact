// src/hooks/useFetchMovies.ts

import { useState, useEffect } from 'react';
// Importamos la interfaz Movie para tipar la respuesta de 'data'
import type { Movie } from '../models/movie.model';

/**
 * Define la estructura del objeto que devuelve el hook.
 */
interface FetchMoviesState {
  /**
   * Los datos obtenidos (un arreglo de películas).
   * Inicia como un arreglo vacío.
   */
  data: Movie[]; 
  
  /**
   * Indicador de estado de carga.
   * 'true' si la petición está en curso, 'false' si ha terminado.
   */
  loading: boolean; 
  
  /**
   * Almacena un mensaje de error si la petición falla.
   * 'null' si no hay error.
   */
  error: string | null; 
}

/**
 * Hook personalizado para obtener un arreglo de películas desde una URL.
 * Maneja los estados de carga, error y los datos resultantes. 
 *
 * @param url La URL de la API a la que se hará la petición fetch. 
 * @returns Un objeto con el estado de la petición: { data, loading, error } 
 */
export function useFetchMovies(url: string): FetchMoviesState {

  // ---- ESTADOS ----
  // El hook gestiona su propio estado interno.
  
  // Estado para los datos (la lista de películas)
  const [data, setData] = useState<Movie[]>([]); 
  
  // Estado para saber si la petición está en curso
  const [loading, setLoading] = useState(true); 
  
  // Estado para almacenar cualquier error
  const [error, setError] = useState<string | null>(null); 

  // ---- EFECTO ----
  /**
   * Hook 'useEffect'.
   * Ejecuta la lógica de 'fetch' cuando el componente que usa
   * este hook se "monta" (se renderiza por primera vez).
   * También se volverá a ejecutar si la 'url' cambia.
   */
  useEffect(() => {
    // 'AbortController' es una API del navegador para cancelar
    // peticiones 'fetch'. Esto es una buena práctica para evitar
    // actualizar el estado si el componente se "desmonta"
    // (ej. el usuario cambia de página) mientras el fetch sigue en curso.
    const controller = new AbortController();
    const signal = controller.signal;

    /**
     * Función asíncrona interna para realizar la petición.
     */
    const fetchData = async () => {
      // 1. Inicia la carga. 
      setLoading(true);
      setError(null);

      try {
        // 2. Realiza la petición fetch. 
        // Le pasamos 'signal' para poder cancelarla si es necesario.
        const response = await fetch(url, { signal });

        // Si la respuesta no es 'ok' (ej. 404, 500),
        // lanzamos un error para que sea capturado por el 'catch'.
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        // 3. Convierte la respuesta a JSON.
        // Asumimos que la API (https://api.tvmaze.com/shows) 
        // devuelve directamente un arreglo de 'Movie'.
        const jsonData: Movie[] = await response.json();

        // 4. Actualiza el estado con los datos.
        setData(jsonData);
        
      } catch (err) {
        // 5. Manejo de errores. 
        
        // Si el error es un 'AbortError', significa que nosotros
        // mismos cancelamos la petición. No hacemos nada.
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Fetch abortado');
        } else if (err instanceof Error) {
          // Si es otro tipo de error, lo guardamos en el estado.
          setError(err.message);
        } else {
          // Error desconocido
          setError('Ocurrió un error desconocido.');
        }

      } finally {
        // 6. Finaliza la carga, tanto si hubo éxito como si hubo error. 
        setLoading(false);
      }
    };

    // Llamamos a la función que acabamos de definir.
    fetchData();

    // ---- FUNCIÓN DE LIMPIEZA (Cleanup) ----
    // Esta función se devuelve desde 'useEffect' y se ejecuta
    // cuando el componente se "desmonta".
    return () => {
      // Le dice al AbortController que cancele la petición 'fetch'
      // que está en curso.
      controller.abort();
    };
    
  }, [url]); // <-- 'url' es la dependencia del 'useEffect'.
             // El efecto se re-ejecutará si esta URL cambia.

  // ---- RETORNO ----
  // El hook devuelve el estado actual. 
  return { data, loading, error };
}