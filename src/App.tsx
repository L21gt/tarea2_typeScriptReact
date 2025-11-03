// src/App.tsx
import { MovieDashboard } from './components/MovieDashboard';
import './App.css'; // Mantenemos los estilos globales si los hubiera

/**
 * Componente raíz de la aplicación.
 * Renderiza el panel de control principal.
 */
function App() {
  return (
    <main>
      {/* <h1>Movie Manager</h1> (El título ahora está en el Dashboard/Sections) */}
      <MovieDashboard /> 
    </main>
  )
}

export default App