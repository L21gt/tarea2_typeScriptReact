// src/components/GenericList.tsx

// Importamos 'ReactNode' para tipar correctamente la función 'renderItem'.
import type { ReactNode } from 'react';
import './GenericList.css';

/**
 * Define las propiedades (props) para el componente genérico GenericList.
 * Utiliza un tipo genérico 'T' como marcador de posición para
 * cualquier tipo de dato que se vaya a listar.
 */
type GenericListProps<T> = { 
  /**
   * Un arreglo de elementos del tipo 'T' que se van a renderizar.
   */
  items: T[]; 
  
  /**
   * Una función que recibe un 'item' (de tipo T) y debe devolver
   * un 'string' único para usarlo como 'key' de React.
   * Esto es crucial para un renderizado eficiente.
   */
  keyExtractor: (item: T) => string; 
  
  /**
   * Una función que recibe un 'item' (de tipo T) y devuelve
   * el elemento JSX (React.ReactNode) que debe renderizarse
   * para ese ítem.
   */
  renderItem: (item: T) => ReactNode; 
};

/**
 * Componente genérico reutilizable para renderizar cualquier tipo de lista.
 *
 * 'T extends object' es una restricción genérica. Significa que el tipo 'T'
 * que se pase debe ser un 'objeto'. Esto es más seguro y específico
 * que usar '{}'.
 *
 * @param {GenericListProps<T>} props Las propiedades del componente.
 */
export const GenericList = <T extends object>({
  items,
  keyExtractor,
  renderItem,
}: GenericListProps<T>) => {
  
  return (
    // Renderizamos un '<ul>' como contenedor de la lista 
    <ul className="generic-list">
      {/*
       * Mapeamos (recorremos) el arreglo 'items'.
       * Para cada 'item' en el arreglo:
       * 1. Obtenemos su 'key' única llamando a 'keyExtractor(item)' .
       * 2. Obtenemos su representación JSX llamando a 'renderItem(item)' .
       */}
      {items.map((item) => (
        <li key={keyExtractor(item)} className="generic-list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};