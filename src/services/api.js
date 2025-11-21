import axios from 'axios'; // Importa axios para hacer peticiones HTTP

const api = axios.create({ // Crea una instancia de axios con configuración común
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' // Base de la API (desde .env o localhost)
});

export default api; // Exporta el cliente para usarlo en toda la app
