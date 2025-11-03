// src/components/FavoriteMovies.tsx

import { useMemo } from 'react';
import type { Movie } from '../models/movie.model';
import './FavoriteMovies.css';

/**
 * Propiedades para el componente FavoriteMovies.
 * Este componente ahora es "controlado" por su padre.
 */
type FavoriteMoviesProps = {
  /**
   * El arreglo de películas favoritas, pasado desde el componente padre.
   */
  favorites: Movie[];
  
  /**
   * Función callback que se ejecuta al hacer clic en 'Eliminar'.
   */
  onRemoveFavorite: (movieId: number) => void;
};

/**
 * Componente "tonto" (presentacional) para mostrar la lista de favoritos.
 * Ya no gestiona su propio estado , lo recibe por props.
 */
export const FavoriteMovies = ({ favorites, onRemoveFavorite }: FavoriteMoviesProps) => {

  /**
   * Hook 'useMemo' para calcular el promedio del rating. 
   * Este cálculo solo se re-ejecutará si el arreglo 'favorites' (prop) cambia.
   */
  const averageRating = useMemo(() => {
    if (favorites.length === 0) {
      return 0;
    }
    const moviesWithRating = favorites.filter(m => m.rating.average !== null);
    if (moviesWithRating.length === 0) {
      return 0;
    }
    const totalRating = moviesWithRating.reduce(
      (sum, movie) => sum + (movie.rating.average || 0),
      0
    );
    const avg = totalRating / moviesWithRating.length;
    return parseFloat(avg.toFixed(1)); // 
  }, [favorites]); // La dependencia ahora es la prop 'favorites'

  return (
    <div className="favorites-container">
      {/* El título se moverá al componente 'Section' */}
      {/* <h3>Mis Favoritas</h3> */}

      {/* Verificación de lista vacía */}
      {favorites.length === 0 ? (
        <p className="favorites-empty">No tienes películas favoritas.</p> 
      ) : (
        <ul className="favorites-list">
          {favorites.map(movie => (
            <li key={movie.id}>
              <span>
                {movie.name} ({movie.rating.average ? `${movie.rating.average}/10` : 'N/A'})
              </span>
              {/* Llama a la función 'onRemoveFavorite' recibida por props */}
              <button onClick={() => onRemoveFavorite(movie.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {favorites.length > 0 && (
        <p className="favorites-average">
          Promedio: {averageRating} 
        </p>
      )}
    </div>
  );
};