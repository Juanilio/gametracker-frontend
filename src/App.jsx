import { Routes, Route, Link } from "react-router-dom"; // Importa componentes de rutas y enlaces de navegación
import BibliotecaJuegos from "./components/BibliotecaJuegos"; // Página: listar juegos
import FormularioJuego from "./components/FormularioJuego"; // Página: crear/editar juego
import DetalleJuego from "./components/DetalleJuego"; // Página: detalle del juego
import EstadisticasPersonales from "./components/EstadisticasPersonales"; // Página: estadísticas

export default function App() { // Componente principal de la app
  return (
    <div> {/* Contenedor principal */}
      <nav className="nav"> {/* Barra de navegación superior */}
        <Link to="/">Biblioteca</Link> {/* Enlace a la página de lista de juegos */}
        <Link to="/agregar">Agregar Juego</Link> {/* Enlace a crear juego */}
        <Link to="/stats">Estadísticas</Link> {/* Enlace a ver estadísticas */}
      </nav>

      <Routes> {/* Define las rutas visibles en la app */}
        <Route path="/" element={<BibliotecaJuegos />} /> {/* Ruta raíz: muestra biblioteca */}
        <Route path="/agregar" element={<FormularioJuego />} /> {/* Ruta para agregar juego */}
        <Route path="/editar/:id" element={<FormularioJuego />} /> {/* Ruta para editar juego (usa :id) */}
        <Route path="/juego/:id" element={<DetalleJuego />} /> {/* Ruta detalle del juego (usa :id) */}
        <Route path="/stats" element={<EstadisticasPersonales />} /> {/* Ruta para estadísticas */}
      </Routes>
    </div>
  );
}
