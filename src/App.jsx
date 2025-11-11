import { Routes, Route, Link } from "react-router-dom";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import DetalleJuego from "./components/DetalleJuego";
import EstadisticasPersonales from "./components/EstadisticasPersonales";

export default function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Biblioteca</Link>
        <Link to="/agregar">Agregar Juego</Link>
        <Link to="/stats">Estadísticas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BibliotecaJuegos />} />
        <Route path="/agregar" element={<FormularioJuego />} />
        <Route path="/editar/:id" element={<FormularioJuego />} />
        <Route path="/juego/:id" element={<DetalleJuego />} />
        <Route path="/stats" element={<EstadisticasPersonales />} />
      </Routes>
    </div>
  );
}
