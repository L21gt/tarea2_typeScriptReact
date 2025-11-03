// src/components/MovieList.tsx

import { useFetchMovies } from '../hooks/useFetchMovies'; 
import { GenericList } from './GenericList'; 
import { MovieCard } from './MovieCard';
import { AlertBox } from './AlertBox'; 
import type { Movie } from '../models/movie.model';
import './MovieList.css';

const API_URL = 'https://api.tvmaze.com/shows'; 

/**
 * Propiedades para el componente MovieList.
 */
type MovieListProps = {
  /**
   * Función callback que se ejecuta al seleccionar una película.
   * Recibe el objeto 'Movie' completo a añadir.
   */
  onAddFavorite: (movie: Movie) => void;
};

/**
 * Componente encargado de obtener y mostrar la lista de películas.
 * @param {MovieListProps} props Las propiedades del componente.
 */
export const MovieList = ({ onAddFavorite }: MovieListProps) => {
  const { data: movies, loading, error } = useFetchMovies(API_URL); 

  if (loading) {
    return (
      <div className="movie-list-loading">
        Cargando películas... 
      </div>
    );
  }

  if (error) {
    return (
      <AlertBox type="error"> 
        <strong>Error:</strong> {error}
      </AlertBox>
    );
  }
  
  /**
   * Manejador para la selección de una película.
   * La 'MovieCard' devuelve un 'id' (string).
   * @param id El ID de la película seleccionada.
   */
  const handleSelectMovie = (id: string) => {
    // 1. Buscamos la película completa en nuestro arreglo 'movies'
    const movieToAdd = movies.find(m => m.id.toString() === id);

    // 2. Si la encontramos, llamamos a la prop 'onAddFavorite'
    if (movieToAdd) {
      onAddFavorite(movieToAdd);
    } else {
      console.warn(`No se encontró la película con ID: ${id}`);
    }
  };
   
  return (
    <div className="movie-list-container">
      {/* El título se moverá al componente 'Section' */}
      {/* <h2>Lista de Películas</h2> */}
      
      <div className="movie-cards-grid">
        <GenericList<Movie>
          items={movies} 
          keyExtractor={(movie) => movie.id.toString()} 
          renderItem={(movie) => ( 
            <MovieCard 
              movie={movie} 
              onSelect={handleSelectMovie} // 
            />
          )}
        />
      </div>
    </div>
  );
};