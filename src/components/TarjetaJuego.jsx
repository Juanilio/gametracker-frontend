import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el componente Link

export default function TarjetaJuego({ game }) {
  // Usamos Link para envolver la tarjeta. 
  // La propiedad 'to' apunta a la ruta de detalle (/juego/:id), 
  // usando el ID único del juego (game._id).
  return (
    <Link to={`/juego/${game._id}`} className="card">
      <h3>{game.title}</h3>
      <p>Plataforma: {game.platform}</p>
      <p>Horas: {game.hoursPlayed}</p>
      <p>Puntuación: {game.rating ?? '—'}</p>
      <p>{game.completed ? 'Completado' : 'En progreso'}</p>
      {/* Botones adicionales pueden ir aquí si son parte de la tarjeta. 
          Si son solo de la vista de detalle, se quedan en DetalleJuego.jsx */}
    </Link>
  );
}