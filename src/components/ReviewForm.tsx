// src/components/ReviewForm.tsx

import { useState } from 'react';
import './ReviewForm.css';

/**
 * Propiedades para el formulario de reseñas.
 */
type ReviewFormProps = {
  /**
   * Callback para añadir una reseña positiva. 
   */
  onAddPositive: (message: string) => void;
  /**
   * Callback para añadir una reseña negativa. 
   */
  onAddNegative: (message: string) => void;
};

/**
 * Componente de formulario para enviar nuevas reseñas.
 * Gestiona el estado local del campo de texto.
 */
export const ReviewForm = ({ onAddPositive, onAddNegative }: ReviewFormProps) => {
  // Estado local para el texto del formulario
  const [message, setMessage] = useState('');

  /**
   * Manejador para el envío de reseñas positivas.
   */
  const handleSubmitPositive = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!message.trim()) return; // No enviar si está vacío
    
    onAddPositive(message); 
    setMessage(''); // Limpia el textarea
  };

  /**
   * Manejador para el envío de reseñas negativas.
   */
  const handleSubmitNegative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onAddNegative(message); 
    setMessage('');
  };

  return (
    <form className="review-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu reseña aquí..."
      />
      <div className="review-form-buttons">
        <button
          type="submit"
          className="btn-positive"
          onClick={handleSubmitPositive}
        >
          Añadir Opinión Positiva
        </button>
        <button
          type="submit"
          className="btn-negative"
          onClick={handleSubmitNegative}
        >
          Añadir Opinión Negativa
        </button>
      </div>
    </form>
  );
};