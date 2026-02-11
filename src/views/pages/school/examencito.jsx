import React, { useEffect, useState } from 'react'

export default function ResponderEjercicio({ id_usuario }) {
  const [ejercicios, setEjercicios] = useState([])
  const [form, setForm] = useState({
    id_ejercicio: '',
    respuesta_usuario: '',
    puntaje: '',
  })
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    if (id_usuario) {
      fetch(`https://mateweb-production.up.railway.app/obtenerejercicios/${id_usuario}`)
        .then((res) => res.json())
        .then(setEjercicios)
      fetchResultados()
    }
  }, [id_usuario])

  const fetchResultados = () => {
    fetch('https://mateweb-production.up.railway.app/resultadosejercicios')
      .then((res) => res.json())
      .then(setResultados)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('https://mateweb-production.up.railway.app/responderejercicio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id_usuario }),
    })
    setForm({ id_ejercicio: '', respuesta_usuario: '', puntaje: '' })
    fetchResultados()
  }

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: '40px auto',
        background: '#f9fafb',
        padding: 24,
        borderRadius: 16,
      }}
    >
      {/* HEADER */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <div
          style={{
            background: '#4f46e5',
            color: 'white',
            borderRadius: 10,
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        ></div>
        <h4 className="mb-0 fw-semibold">Responder Ejercicio</h4>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          marginBottom: 32,
        }}
      >
        <div className="row g-3">
          {/* EJERCICIO */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Ejercicio</label>
            <select
              className="form-select"
              value={form.id_ejercicio}
              onChange={(e) => setForm({ ...form, id_ejercicio: e.target.value })}
              required
            >
              <option value="">Seleccione un ejercicio</option>
              {ejercicios.map((e) => (
                <option key={e.id_ejercicio} value={e.id_ejercicio}>
                  {e.enunciado}
                </option>
              ))}
            </select>
          </div>

          {/* RESPUESTA */}
          <div className="col-md-8">
            <label className="form-label fw-semibold">Respuesta del estudiante</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese la respuesta"
              value={form.respuesta_usuario}
              onChange={(e) => setForm({ ...form, respuesta_usuario: e.target.value })}
              required
            />
          </div>

          {/* PUNTAJE */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">Puntaje</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ej: 10"
              value={form.puntaje}
              onChange={(e) => setForm({ ...form, puntaje: e.target.value })}
              required
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            style={{
              background: '#0f172a',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '10px 24px',
              fontWeight: 500,
            }}
          >
            Enviar respuesta
          </button>
        </div>
      </form>

      {/* RESULTADOS */}
      <div
        style={{
          background: 'white',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        <h5 className="fw-semibold mb-3">Resultados</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
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
              {resultados.map((r) => (
                <tr key={r.id_resultado}>
                  <td>{r.id_resultado}</td>
                  <td>{r.enunciado}</td>
                  <td>
                    {r.nombre_usuario} {r.apellido_usuario}
                  </td>
                  <td>{r.respuesta_usuario}</td>
                  <td>
                    <span className="fw-semibold">{r.puntaje}</span>
                  </td>
                  <td>{r.fecha_realizacion}</td>
                </tr>
              ))}
              {resultados.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No hay resultados registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
