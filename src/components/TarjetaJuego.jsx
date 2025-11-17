import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TarjetaJuego({ game }) {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/juego/${game._id}`)}>
      <img src={game.coverUrl || '/placeholder.png'} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Plataforma: {game.platform}</p>
      <p>Horas: {game.hoursPlayed}</p>
      <p>Puntuación: {game.rating ?? '—'}</p>
      <p>{game.completed ? 'Completado' : 'En progreso'}</p>
      {/* botones: ver, editar, eliminar (llamar a API correspondiente) */}
    </div>
  );
}
