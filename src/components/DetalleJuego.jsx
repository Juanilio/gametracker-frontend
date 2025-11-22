import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import ListaReseñas from "./ListaReseñas";
import FormularioReseña from "./FormularioReseña";

export default function DetalleJuego() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  const cargar = () => {
    api.get(`/games/${id}`).then(res => setGame(res.data));
  };

  useEffect(() => cargar(), [id]);

  const eliminar = async () => {
    await api.delete(`/games/${id}`);
    navigate("/");
  };

  if (!game) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h1>{game.title}</h1>

      <p>Plataforma: {game.platform}</p>
      <p>Horas Jugadas: {game.hoursPlayed}</p>
      <p>Puntuación: {game.rating ? `${game.rating}/5` : '—'}</p>
      <p>{game.completed ? "Completado" : "En progreso"}</p>
      <p>Géneros: {game.genres.join(", ")}</p>

      <Link to={`/editar/${game._id}`} className="btn ghost">Editar</Link>
      <button onClick={eliminar} className="btn">Eliminar</button>


      <h2>Reseñas</h2>
      <ListaReseñas gameId={id} />
      <FormularioReseña gameId={id} onDone={cargar} />
    </div>
  );
}
