// src/components/MovieCard.tsx

// Importamos la interfaz 'Movie' que definimos en el Paso 1.
import type { Movie } from '../models/movie.model';
// Importamos los estilos CSS para este componente.
import './MovieCard.css';

/**
 * Define las propiedades (props) que el componente MovieCard espera recibir.
 */
type MovieCardProps = {
  /**
   * El objeto de película completo a mostrar.
   */
  movie: Movie; 

  /**
   * Función callback que se ejecuta cuando el usuario selecciona la película.
   * Recibe el 'id' de la película como un string.
   */
  onSelect: (id: string) => void; 
};

/**
 * Componente funcional 'MovieCard'.
 * Responsable de renderizar la información de una sola película.
 *
 * @param {MovieCardProps} props Las propiedades del componente.
 * @param {Movie} props.movie El objeto de película a mostrar.
 * @param {Function} props.onSelect La función a llamar al hacer clic.
 */
export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {

  // Formateamos el rating para mostrar 'N/A' si es nulo .
  const ratingStr = movie.rating.average
    ? `${movie.rating.average}/10`
    : 'N/A';

  // Verificamos si la película no está disponible .
  // Usamos 'status' ya que la interfaz 'Movie' no define 'available'.
  // Asumimos que "Ended" significa que no está disponible para seleccionar.
  const isUnavailable = movie.status === 'Ended'; 

  /**
   * Manejador para el evento 'click' del botón.
   * Llama a la prop 'onSelect' convirtiendo el 'movie.id' (number)
   * a un 'string', para coincidir con la firma del tipo 'onSelect' .
   */
  const handleSelectClick = () => {
    // Convertimos el ID (número) a string .
    onSelect(movie.id.toString());
  };

  return (
    <div className="movie-card">
      {/* Contenedor para la imagen y el contenido */}
      <div>
        {/* Mostramos la imagen 'medium' si existe */}
        {movie.image && (
          <img src={movie.image.medium} alt={`Portada de ${movie.name}`} />
        )}
        
        <h3>{movie.name}</h3> 
        
        <p>
          {/* Unimos los géneros con comas para mostrarlos */}
          Géneros: {movie.genres.join(', ')}
        </p>
        
        <p>
          {/* Mostramos el rating formateado */}
          Rating: {ratingStr}
        </p>
      </div>

      {/* Botón de acción */}
      <button 
        onClick={handleSelectClick} 
        disabled={isUnavailable} 
      >
        {isUnavailable ? 'No Disponible' : 'Seleccionar'}
      </button>
    </div>
  );
};

/*
// --- Ejemplo de uso (basado en el PDF) ---
// No puedes ejecutar este ejemplo aquí, pero así es como se
// usaría este componente dentro de otro (como App.tsx o MovieList.tsx)

const miPelicula: Movie = {
  id: 2,
  name: "Person of Interest",
  language: "English",
  genres: ["Action", "Crime", "Science-Fiction"],
  status: "Ended",
  rating: { average: 8.8 },
  image: { medium: "url_a_la_imagen.jpg", original: "..." }
};

const handleSelect = (id: string) => {
  console.log("Película seleccionada con ID:", id);
};

// <MovieCard movie={miPelicula} onSelect={handleSelect} /> 

*/