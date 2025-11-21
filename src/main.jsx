import { StrictMode } from "react"; // Importa el modo estricto de React (ayuda en desarrollo)
import { createRoot } from "react-dom/client"; // Crea el punto de entrada para renderizar la app en el DOM
import { BrowserRouter } from "react-router-dom"; // Habilita la navegación por rutas en el navegador
import "./styles.css"; // Importa estilos globales de la app
import App from "./App.jsx"; // Importa el componente principal de la aplicación

createRoot(document.getElementById('root')).render( // Selecciona el elemento #root y renderiza la app ahí
  <StrictMode> {/* Envuelve la app en StrictMode para detectar problemas comunes */}
    <BrowserRouter> {/* Habilita react-router para manejar rutas en el frontend */}
      <App /> {/* Renderiza el componente principal que define rutas y vistas */}
    </BrowserRouter>
  </StrictMode>
);
