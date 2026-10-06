export interface Activity {
  id: number
  nombre: string
  fecha: string
  cupoDisponible: number
  estado: 'abierta' | 'llena'
}

export const activities: Activity[] = [
  {
    id: 1,
    nombre: 'Clase de Yoga',
    fecha: '2023-10-25',
    cupoDisponible: 10,
    estado: 'abierta',
  },
  {
    id: 2,
    nombre: 'Taller de Pintura',
    fecha: '2023-10-26',
    cupoDisponible: 0,
    estado: 'llena',
  },
  {
    id: 3,
    nombre: 'Entrenamiento Funcional',
    fecha: '2023-10-27',
    cupoDisponible: 5,
    estado: 'abierta',
  },
]
