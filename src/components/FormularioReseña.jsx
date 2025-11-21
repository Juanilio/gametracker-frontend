import React, { useState } from "react"; // Importa React y hook de estado
import api from "../services/api"; // Cliente HTTP

export default function FormularioReseña({ gameId, onDone }) { // Formulario para agregar reseña a un juego
  const [form, setForm] = useState({ // Estado del formulario
    author: "", // Autor de la reseña
    rating: "", // Puntuación
    content: "" // Texto de la reseña
  });

  const handleChange = e => { // Maneja cambios en los inputs
    setForm({
      ...form, // Copia estado actual
      [e.target.name]: e.target.value // Actualiza el campo que cambió
    });
  };

  const handleSubmit = async e => { // Maneja envío del formulario
    e.preventDefault(); // Evita recarga de página
    await api.post(`/reviews/game/${gameId}`, form); // Envía POST al backend para crear reseña
    setForm({ author: "", rating: "", content: "" }); // Limpia formulario
    onDone(); // Notifica al padre para recargar datos (detalle del juego)
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}> {/* Formulario con estilos de reseña */}
      <h3>Agregar reseña</h3> {/* Título del formulario */}
      <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} /> {/* Campo autor */}
      <input type="number" min="0" max="5" name="rating" placeholder="Puntuación (0-5)" value={form.rating} onChange={handleChange} /> {/* Campo rating */}
      <textarea name="content" placeholder="Escribe tu reseña..." value={form.content} onChange={handleChange} /> {/* Campo texto de reseña */}
      <button type="submit">Enviar</button> {/* Botón enviar */}
    </form>
  );
}
