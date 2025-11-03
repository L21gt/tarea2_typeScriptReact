// src/components/Section.tsx

// Importamos 'ReactNode' para tipar correctamente la prop 'children' .
import type { ReactNode } from 'react';
import './Section.css';

/**
 * Define las propiedades (props) que el componente Section espera recibir.
 */
type SectionProps = { 
  /**
   * El texto que se mostrará como el título <h2> de la sección.
   */
  title: string; 

  /**
   * 'children' es una prop especial en React.
   * Representa cualquier contenido JSX que se anide *dentro*
   * de las etiquetas de este componente al usarlo.
   */
  children: ReactNode; 
};

/**
 * Componente de diseño (layout) que renderiza un contenedor
 * estándar con un título <h2> y un área de contenido <div>.
 *
 * @param {SectionProps} props Las propiedades del componente.
 * @param {string} props.title El título a mostrar.
 * @param {ReactNode} props.children El contenido a renderizar dentro de la sección.
 */
export const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="section-container">
      {/* El título se renderiza en un h2 */}
      <h2 className="section-title">{title}</h2>
      
      {/* El contenido (children) se renderiza en un div */}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

/*
// --- Ejemplo de uso (basado en el PDF) ---
// Así es como se usaría este componente para "envolver"
// a nuestro componente FavoriteMovies (Paso 4).

import { FavoriteMovies } from './FavoriteMovies';

<Section title="Mis Favoritas"> 
  {/*
   * Todo lo que está aquí adentro (en este caso,
   * el componente <FavoriteMovies />) se pasará
   * automáticamente a la prop 'children' del
   * componente 'Section'.
   *}
  <FavoriteMovies /> 
</Section>

*/