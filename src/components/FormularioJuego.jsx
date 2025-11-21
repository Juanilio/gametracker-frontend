import React, { useEffect, useState } from "react"; // Importa React y hooks para estado/efectos
import { Link } from 'react-router-dom'; // Importa Link (si se usa navegación por enlace)
import { useNavigate, useParams } from "react-router-dom"; // Hooks para navegar y leer :id de la URL
import api from "../services/api"; // Cliente HTTP

export default function FormularioJuego() { // Componente formulario para crear/editar juegos
  const { id } = useParams(); // Lee el parámetro :id si estamos editando
  const navigate = useNavigate(); // Permite redirigir tras guardar

  const [form, setForm] = useState({ // Estado del formulario con campos del juego
    title: "", // Título
    platform: "", // Plataforma
    coverUrl: "", // URL de portada
    hoursPlayed: 0, // Horas jugadas
    completed: false, // Estado terminado o no
    rating: "", // Puntuación
    genres: "", // Géneros como texto separado por comas
  });

  useEffect(() => { // Al montar o cambiar id, si hay id, cargar datos del juego
    if (id) {
      api.get(`/games/${id}`).then(res => { // GET /games/:id para precargar datos en el formulario
        const g = res.data; // Datos del juego recibido
        setForm({
          ...g, // Copia todos los campos del juego
          genres: g.genres?.join(", ") || "" // Convierte array de géneros a texto con comas
        });
      });
    }
  }, [id]); // Efecto depende de id

  const handleChange = e => { // Maneja cambios en inputs
    const { name, value, type, checked } = e.target; // Extrae propiedades del input
    setForm({
      ...form, // Copia estado actual
      [name]: type === "checkbox" ? checked : value // Guarda nuevo valor (checkbox usa checked)
    });
  };

  const handleSubmit = async (e) => { // Maneja envío del formulario
    e.preventDefault(); // Evita recarga de página

    const body = {
      ...form, // Copia campos
      genres: form.genres.split(",").map(s => s.trim()) // Convierte texto de géneros en array (limpia espacios)
    };

    if (id) {
      await api.put(`/games/${id}`, body); // Si hay id: editar juego (PUT)
    } else {
      await api.post("/games", body); // Si no hay id: crear juego (POST)
    }

    navigate("/"); // Redirige a biblioteca tras guardar
  };

  return (
    <div className="container"> {/* Contenedor del formulario */}
      <h2>{id ? "Editar Juego" : "Agregar Juego"}</h2> {/* Título dinámico según crear/editar */}

      <form className="form" onSubmit={handleSubmit}> {/* Formulario con manejador de submit */}
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required /> {/* Campo título */}
        <input name="platform" placeholder="Plataforma" value={form.platform} onChange={handleChange} /> {/* Campo plataforma */}
        <input name="coverUrl" placeholder="URL de portada" value={form.coverUrl} onChange={handleChange} /> {/* Campo portada */}
        <input name="hoursPlayed" type="number" placeholder="Horas jugadas" value={form.hoursPlayed} onChange={handleChange} /> {/* Campo horas */}
        <input name="rating" type="number" min="0" max="5" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} /> {/* Campo rating */}
        <input name="genres" placeholder="Géneros (separados por coma)" value={form.genres} onChange={handleChange} /> {/* Campo géneros como texto */}
        <label> {/* Etiqueta para checkbox de completado */}
          <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} /> {/* Checkbox completado */}
          Completado {/* Texto al lado del checkbox */}
        </label>
        <button type="submit">Guardar</button> {/* Botón para enviar formulario */}
      </form>
    </div>
  );
}
