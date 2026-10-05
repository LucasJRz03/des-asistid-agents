import { useState } from 'react'
import { activities } from './data/activities'
import './App.css'

function App() {
  const [filter, setFilter] = useState('')

  const filteredActivities = activities.filter((activity) =>
    activity.nombre.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lista de Actividades</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="search">Filtrar por nombre: </label>
        <input
          id="search"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar actividad..."
          style={{ padding: '5px', marginLeft: '10px' }}
        />
      </div>

      <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Fecha</th>
            <th style={{ padding: '10px' }}>Cupo Disponible</th>
            <th style={{ padding: '10px' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((activity) => (
            <tr key={activity.id}>
              <td style={{ padding: '10px' }}>{activity.nombre}</td>
              <td style={{ padding: '10px' }}>{activity.fecha}</td>
              <td style={{ padding: '10px' }}>{activity.cupoDisponible}</td>
              <td style={{ padding: '10px' }}>{activity.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredActivities.length === 0 && (
        <p style={{ marginTop: '20px', color: 'gray' }}>No se encontraron actividades.</p>
      )}
    </div>
  )
}

export default App
