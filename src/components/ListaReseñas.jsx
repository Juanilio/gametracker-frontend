import React, { useEffect, useState } from "react"; // Importa React y hooks
import api from "../services/api"; // Cliente HTTP

export default function ListaReseñas({ gameId }) { // Componente que lista reseñas de un juego
  const [reviews, setReviews] = useState([]); // Estado: lista de reseñas

  const cargar = () => { // Función para pedir reseñas al backend
    api.get(`/reviews/game/${gameId}`).then(res => setReviews(res.data)); // GET /reviews/game/:gameId y guarda en estado
  };

  useEffect(() => cargar(), [gameId]); // Cuando cambia el gameId, recarga reseñas

  const eliminar = async (id) => { // Función para eliminar una reseña
    await api.delete(`/reviews/${id}`); // DELETE /reviews/:id en el backend
    cargar(); // Vuelve a cargar la lista tras eliminar
  };

  return (
    <div> {/* Contenedor de reseñas */}
      {reviews.map(r => ( // Itera sobre reseñas para mostrarlas
        <div key={r._id} className="review"> {/* Caja visual de cada reseña */}
          <p><strong>{r.author}</strong> — {r.rating}/5</p> {/* Muestra autor y rating */}
          <p>{r.content}</p> {/* Texto de la reseña */}
          <button onClick={() => eliminar(r._id)}>Eliminar</button> {/* Botón para eliminar la reseña */}
        </div>
      ))}

      {reviews.length === 0 && <p>No hay reseñas todavía.</p>} {/* Si no hay reseñas, muestra mensaje */}
    </div>
  );
}
