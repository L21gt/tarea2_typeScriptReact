// src/components/MovieDashboard.tsx

import { useState } from 'react';
// --- Componentes ---
import { Section } from './Section'; 
import { MovieList } from './MovieList'; 
import { FavoriteMovies } from './FavoriteMovies'; 
import { ReviewForm } from './ReviewForm';

// --- Hooks ---
import { useReviews } from '../hooks/useReviews'; 

// --- Modelos y Tipos ---
import type { Movie } from '../models/movie.model';
import { renderReview } from '../models/review.model'; 

// --- Estilos ---
import './MovieDashboard.css';

/**
 * Componente principal que integra todas las secciones
 * de la aplicación (Lista, Favoritos, Reseñas).
 * Este componente gestiona el estado "levantado".
 */
export const MovieDashboard = () => {
  
  // --- Estado de Favoritos (State Lifting) ---
  // Este estado es compartido entre MovieList y FavoriteMovies
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // --- Estado de Reseñas ---
  // Obtenemos el estado y las funciones del hook de reseñas 
  const { reviews, addPositiveReview, addNegativeReview } = useReviews(); 

  /**
   * Función para agregar una película a favoritos.
   * Se pasará como prop a 'MovieList'.
   * @param movie La película (tipo Movie) a agregar.
   */
  const handleAddFavorite = (movie: Movie) => {
    // Comprobamos si la película ya está en favoritos por su ID
    if (!favorites.find(fav => fav.id === movie.id)) {
      setFavorites(prevFavorites => [...prevFavorites, movie]);
      alert(`¡"${movie.name}" se agregó a favoritos!`);
    } else {
      alert(`"${movie.name}" ya está en favoritos.`);
    }
  };

  /**
   * Función para eliminar una película de favoritos.
   * Se pasará como prop a 'FavoriteMovies'.
   * @param movieId El ID (number) de la película a eliminar.
   */
  const handleRemoveFavorite = (movieId: number) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => movie.id !== movieId)
    );
  };

  return (
    <div className="dashboard-layout">
      
      {/* Columna Principal: Lista de Películas */}
      <div className="dashboard-main">
        <Section title="Lista de Películas"> 
          <MovieList onAddFavorite={handleAddFavorite} /> 
        </Section>
      </div>

      {/* Columna Lateral: Favoritos y Reseñas */}
      <div className="dashboard-sidebar">
        
        <Section title="Mis Favoritas"> 
          <FavoriteMovies 
            favorites={favorites} 
            onRemoveFavorite={handleRemoveFavorite} 
          /> 
        </Section>

        <Section title="Reseñas"> 
          {/* Formulario para añadir reseñas */}
          <ReviewForm 
            onAddPositive={addPositiveReview} 
            onAddNegative={addNegativeReview} 
          />
          
          {/* Lista de reseñas enviadas */}
          <ul className="reviews-list">
            {reviews.length === 0 ? (
              <p>Aún no hay reseñas.</p>
            ) : (
              reviews.map((review, index) => (
                <li 
                  key={index} 
                  // Asigna una clase CSS basada en el tipo de reseña 
                  className={review.type === 'positive' ? 'review-positive' : 'review-negative'}
                >
                  {renderReview(review)} {/* */}
                </li>
              ))
            )}
          </ul>
        </Section>

      </div>

    </div>
  );
};