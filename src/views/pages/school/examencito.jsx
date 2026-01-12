import React, { useEffect, useState } from 'react';

export default function ResponderEjercicio({ id_usuario }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [form, setForm] = useState({ id_ejercicio: '', respuesta_usuario: '', puntaje: '' });
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    if (id_usuario) {
      fetch(`http://localhost:4000/obtenerejercicios/${id_usuario}`)
        .then(res => res.json())
        .then(setEjercicios);
      fetchResultados();
    }
  }, [id_usuario]);

  const fetchResultados = () => {
    fetch('http://localhost:4000/resultadosejercicios')
      .then(res => res.json())
      .then(setResultados);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/responderejercicio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id_usuario })
    });
    setForm({ id_ejercicio: '', respuesta_usuario: '', puntaje: '' });
    fetchResultados();
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h2>Responder Ejercicio</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <select
          value={form.id_ejercicio}
          onChange={e => setForm({ ...form, id_ejercicio: e.target.value })}
          required
        >
          <option value="">Seleccione un ejercicio</option>
          {ejercicios.map(e => (
            <option key={e.id_ejercicio} value={e.id_ejercicio}>{e.enunciado}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Respuesta del estudiante"
          value={form.respuesta_usuario}
          onChange={e => setForm({ ...form, respuesta_usuario: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Puntaje"
          value={form.puntaje}
          onChange={e => setForm({ ...form, puntaje: e.target.value })}
          required
        />
        <button type="submit">Enviar Respuesta</button>
      </form>
      <h3>Resultados</h3>
      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ejercicio</th>
            <th>Estudiante</th>
            <th>Respuesta</th>
            <th>Puntaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(r => (
            <tr key={r.id_resultado}>
              <td>{r.id_resultado}</td>
              <td>{r.enunciado}</td>
              <td>{r.nombre_usuario} {r.apellido_usuario}</td>
              <td>{r.respuesta_usuario}</td>
              <td>{r.puntaje}</td>
              <td>{r.fecha_realizacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}