// src/components/AlertBox.tsx

import type { ReactNode } from 'react';
import './AlertBox.css';

/**
 * Propiedades para el componente AlertBox.
 */
type AlertBoxProps = {
  /**
   * El tipo de alerta a mostrar (ej. 'error').
   * Determina los estilos CSS que se aplicarán.
   */
  type: 'error'; // Por ahora solo soporta 'error'

  /**
   * El contenido a mostrar dentro de la alerta (ej. el mensaje de error).
   */
  children: ReactNode;
};

/**
 * Componente reutilizable para mostrar mensajes de alerta.
 *
 * @param {AlertBoxProps} props Las propiedades del componente.
 */
export const AlertBox = ({ type, children }: AlertBoxProps) => {
  // Construye la lista de clases CSS
  // Ej: "alert-box alert-box-error"
  const className = `alert-box alert-box-${type}`;

  return (
    <div className={className} role="alert">
      {children}
    </div>
  );
};