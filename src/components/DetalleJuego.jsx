import React, { useEffect, useState } from "react"; // Importa React y hooks para estado y efectos
import { useParams, Link, useNavigate } from "react-router-dom"; // Hooks para leer parámetros de la URL y navegar
import api from "../services/api"; // Cliente HTTP (axios)
import ListaReseñas from "./ListaReseñas"; // Componente que lista reseñas del juego
import FormularioReseña from "./FormularioReseña"; // Componente para crear reseñas nuevas

export default function DetalleJuego() { // Página de detalle del juego
  const { id } = useParams(); // Obtiene el ID del juego desde la URL
  const navigate = useNavigate(); // Permite redirigir a otras rutas
  const [game, setGame] = useState(null); // Estado: datos del juego (inicialmente no cargado)

  const cargar = () => { // Función para cargar los datos del juego
    api.get(`/games/${id}`).then(res => setGame(res.data)); // GET /games/:id y guarda respuesta en estado
  };

  useEffect(() => cargar(), [id]); // Cuando cambia el id, recarga los datos del juego

  const eliminar = async () => { // Función para eliminar el juego actual
    await api.delete(`/games/${id}`); // DELETE /games/:id en el backend
    navigate("/"); // Tras eliminar, redirige a la biblioteca
  };

  if (!game) return <p>Cargando...</p>; // Mientras no hay datos, muestra indicador de carga

  return (
    <div className="container"> {/* Contenedor de detalle */}
      <h1>{game.title}</h1> {/* Muestra título del juego */}
      <img
        src={game.coverUrl || "https://via.placeholder.com/200"} // Muestra portada o imagen por defecto
        alt={game.title} // Texto alternativo con el título del juego
      />

      <p>Plataforma: {game.platform}</p> {/* Plataforma */}
      <p>Horas: {game.hoursPlayed}</p> {/* Horas jugadas */}
      <p>Rating: {game.rating ?? "—"}</p> {/* Rating (o guión si no hay) */}
      <p>{game.completed ? "Completado" : "En progreso"}</p> {/* Estado del juego */}
      <p>Géneros: {game.genres.join(", ")}</p> {/* Lista de géneros separada por comas */}

      <Link to={`/editar/${game._id}`}>Editar</Link> {/* Enlace para editar este juego */}
      <button onClick={eliminar}>Eliminar</button> {/* Botón para eliminar el juego */}

      <h2>Reseñas</h2> {/* Sección de reseñas */}
      <ListaReseñas gameId={id} /> {/* Lista reseñas del juego actual */}
      <FormularioReseña gameId={id} onDone={cargar} /> {/* Formulario para crear reseña y recargar al terminar */}
    </div>
  );
}
