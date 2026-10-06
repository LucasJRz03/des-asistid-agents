import { useState, type FormEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { activities as initialActivities } from './data/activities'

type ActivityWithCategory = (typeof initialActivities)[number] & {
  categoria: string
}

const initialCategories = ['Bienestar', 'Arte', 'Fitness']

const activitiesWithCategories: ActivityWithCategory[] = initialActivities.map(
  (activity, index) => ({
    ...activity,
    categoria: initialCategories[index] ?? 'General',
  })
)

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

function App() {
  const [filter, setFilter] = useState('')
  const [activities, setActivities] = useState(activitiesWithCategories)
  const [expandedActivityId, setExpandedActivityId] = useState<number | null>(
    null
  )
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [cupoDisponible, setCupoDisponible] = useState('')
  const [categoria, setCategoria] = useState('')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const filteredActivities = activities.filter((activity) =>
    activity.nombre
      .toLocaleLowerCase('es')
      .includes(filter.toLocaleLowerCase('es'))
  )

  function handleCreateActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = nombre.trim()
    const trimmedCategory = categoria.trim()
    const availableSpots = Number(cupoDisponible)

    if (
      !trimmedName ||
      !fecha ||
      !trimmedCategory ||
      cupoDisponible === '' ||
      !Number.isInteger(availableSpots) ||
      availableSpots < 0
    ) {
      return
    }

    setActivities((currentActivities) => [
      ...currentActivities,
      {
        id:
          currentActivities.reduce(
            (highestId, activity) => Math.max(highestId, activity.id),
            0
          ) + 1,
        nombre: trimmedName,
        fecha,
        cupoDisponible: availableSpots,
        estado: availableSpots > 0 ? 'abierta' : 'llena',
        categoria: trimmedCategory,
      },
    ])

    setNombre('')
    setFecha('')
    setCupoDisponible('')
    setCategoria('')
    setFilter('')
    setSubmissionMessage(`La actividad “${trimmedName}” fue creada.`)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-left text-foreground sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 space-y-3 sm:mb-10">
          <p className="text-sm font-medium text-muted-foreground">
            Agenda comunitaria
          </p>
          <h1 className="m-0 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Actividades
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Explorá las propuestas disponibles y encontrá tu próximo plan.
          </p>
        </header>

        <section aria-labelledby="create-activity-heading" className="mb-10">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle>
                <h2
                  id="create-activity-heading"
                  className="m-0 text-xl font-semibold tracking-tight text-foreground"
                >
                  Crear actividad
                </h2>
              </CardTitle>
              <CardDescription>
                Completá los datos para agregar una nueva propuesta a la agenda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                onSubmit={handleCreateActivity}
              >
                <div className="space-y-2">
                  <Label htmlFor="new-activity-name">Nombre</Label>
                  <Input
                    id="new-activity-name"
                    name="nombre"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    placeholder="Ej. Taller de cerámica"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-activity-date">Fecha</Label>
                  <Input
                    id="new-activity-date"
                    name="fecha"
                    type="date"
                    value={fecha}
                    onChange={(event) => setFecha(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-activity-spots">Cupo disponible</Label>
                  <Input
                    id="new-activity-spots"
                    name="cupoDisponible"
                    type="number"
                    min="0"
                    step="1"
                    value={cupoDisponible}
                    onChange={(event) => setCupoDisponible(event.target.value)}
                    placeholder="Ej. 12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-activity-category">Categoría</Label>
                  <Input
                    id="new-activity-category"
                    name="categoria"
                    value={categoria}
                    onChange={(event) => setCategoria(event.target.value)}
                    placeholder="Ej. Bienestar"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-4 sm:flex-row sm:items-center">
                  <Button type="submit">Agregar actividad</Button>
                  {submissionMessage && (
                    <p
                      className="text-sm text-muted-foreground"
                      role="status"
                      aria-live="polite"
                    >
                      {submissionMessage}
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="activities-heading">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="activities-heading"
                className="m-0 text-xl font-semibold tracking-tight text-foreground"
              >
                Próximas actividades
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredActivities.length}{' '}
                {filteredActivities.length === 1
                  ? 'actividad encontrada'
                  : 'actividades encontradas'}
              </p>
            </div>

            <div className="w-full sm:max-w-sm">
              <label
                htmlFor="activity-search"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Buscar por nombre
              </label>
              <input
                id="activity-search"
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Ej. yoga"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-sm"
              />
            </div>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActivities.map((activity) => {
                const isExpanded = expandedActivityId === activity.id
                const detailId = `activity-detail-${activity.id}`

                return (
                  <Card
                    key={activity.id}
                    className="h-full transition-shadow hover:shadow-md"
                  >
                    <CardHeader className="flex flex-row items-start justify-between gap-3">
                      <div className="space-y-1">
                        <CardTitle>
                          <h3 className="m-0 text-lg font-semibold tracking-tight text-foreground">
                            {activity.nombre}
                          </h3>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {activity.categoria} · Actividad #{activity.id}
                        </p>
                      </div>
                      <Badge
                        variant={
                          activity.estado === 'llena'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {activity.estado === 'llena' ? 'Llena' : 'Abierta'}
                      </Badge>
                    </CardHeader>

                    <CardContent className="flex h-full flex-col gap-4 pt-2">
                      <dl className="m-0 space-y-3">
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            Fecha
                          </dt>
                          <dd className="m-0 text-sm font-medium text-foreground">
                            {dateFormatter.format(
                              new Date(`${activity.fecha}T00:00:00`)
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            Cupo disponible
                          </dt>
                          <dd className="m-0 text-sm font-medium text-foreground">
                            {activity.cupoDisponible}{' '}
                            {activity.cupoDisponible === 1
                              ? 'lugar'
                              : 'lugares'}
                          </dd>
                        </div>
                      </dl>

                      <div
                        id={detailId}
                        role="region"
                        aria-label={`Detalle de ${activity.nombre}`}
                        hidden={!isExpanded}
                        className="rounded-md border border-border bg-muted/50 p-3 text-sm"
                      >
                        <p className="font-medium text-foreground">
                          Detalle de la actividad
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          {activity.nombre} se realiza el{' '}
                          {dateFormatter.format(
                            new Date(`${activity.fecha}T00:00:00`)
                          )}{' '}
                          en la categoría {activity.categoria}, y tiene{' '}
                          {activity.cupoDisponible}{' '}
                          {activity.cupoDisponible === 1
                            ? 'lugar disponible'
                            : 'lugares disponibles'}
                          .
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="mt-auto self-start"
                        aria-expanded={isExpanded}
                        aria-controls={detailId}
                        onClick={() =>
                          setExpandedActivityId(isExpanded ? null : activity.id)
                        }
                      >
                        {isExpanded ? 'Ocultar detalle' : 'Ver detalle'}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
              <p className="font-medium text-foreground">
                No se encontraron actividades
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Probá con otro nombre o borrá la búsqueda.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
