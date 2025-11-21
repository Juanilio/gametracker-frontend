import React, { useEffect, useState } from 'react'; // Importa React y hooks para estado y efectos
import api from '../services/api'; // Cliente HTTP (axios) configurado con baseURL
import TarjetaJuego from './TarjetaJuego'; // Componente que muestra información de un juego

export default function BibliotecaJuegos() { // Componente de la página de biblioteca
  const [games, setGames] = useState([]); // Estado: lista de juegos (inicialmente vacía)

  useEffect(() => { // Al montar el componente, carga los juegos desde el backend
    const load = async () => { // Función asíncrona para pedir datos
      const res = await api.get('/games'); // Hace GET a /games (backend) para obtener la lista
      setGames(res.data); // Guarda la lista de juegos en el estado
    };
    load(); // Ejecuta la carga inicial
  }, []); // Dependencias vacías: se ejecuta una sola vez al montar

  return (
    <div> {/* Contenedor de la vista */}
      <h2>Mi Biblioteca</h2> {/* Título de la página */}
      <div className="grid"> {/* Contenedor en cuadrícula para tarjetas */}
        {games.map(g => <TarjetaJuego key={g._id} game={g} />)} {/* Por cada juego, renderiza una TarjetaJuego */}
      </div>
    </div>
  );
}
