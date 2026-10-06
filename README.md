# Actividad 01 — Desarrollo asistido por agentes

Aplicación web para consultar, filtrar y crear actividades. Este proyecto se
desarrolló como ejercicio de colaboración entre una persona y GitHub Copilot en
VS Code, usando instrucciones persistentes y una skill especializada para guiar
el trabajo del agente.

## Stack tecnológico

- **React 19** para la interfaz y el estado interactivo.
- **TypeScript 6** para tipado estático.
- **Vite 8** para desarrollo local y compilación.
- **Tailwind CSS 4** para estilos responsive y colores semánticos.
- **shadcn/ui** para componentes de interfaz reutilizables en
  `src/components/ui/`, basados en primitivas de Radix UI.
- **Lucide React** para iconografía.
- **pnpm** como único gestor de paquetes del proyecto.
- **ESLint** para análisis estático y reglas de calidad.

## Funcionalidades

- Lista de actividades con nombre, fecha, cupo disponible, categoría y estado.
- Búsqueda de actividades por nombre.
- Formulario para crear actividades con nombre, fecha, cupo y categoría.
- Actualización inmediata de la lista al enviar el formulario.
- Estado derivado del cupo: una actividad queda abierta si tiene lugares
  disponibles y llena si el cupo es cero.
- Vista de detalle expandible por actividad.
- Diseño adaptable a móviles, tabletas y pantallas grandes.

> Las actividades iniciales son datos simulados. Las actividades creadas por el
> formulario viven en el estado de React y se pierden al recargar la página;
> todavía no hay API ni almacenamiento persistente.

## Organización y decisiones de arquitectura

```text
.
├── .agents/
│   └── skills/
│       └── ui-design/
│           └── SKILL.md
├── src/
│   ├── components/
│   │   └── ui/             # Componentes shadcn/ui reutilizables
│   ├── data/
│   │   └── activities.ts   # Datos iniciales simulados y su tipo
│   ├── lib/
│   │   └── utils.ts        # Utilidades compartidas, como cn
│   ├── App.tsx             # Pantalla, estado local y lógica de interacción
│   ├── index.css           # Tailwind, tokens y estilos base
│   └── main.tsx            # Punto de entrada de React
├── AGENTS.md               # Instrucciones persistentes del repositorio
├── components.json         # Configuración y aliases de shadcn/ui
├── package.json            # Dependencias y comandos
└── vite.config.ts          # Vite, React, Tailwind y alias de imports
```

Las responsabilidades se separan de acuerdo con su alcance:

- `src/data/activities.ts` contiene el conjunto inicial de datos y el contrato
  de actividad, sin mezclarlo con la presentación.
- `src/components/ui/` contiene primitivas de UI que se pueden reutilizar en
  distintas pantallas.
- `src/App.tsx` coordina el estado y los flujos de esta pantalla. Como no existe
  backend, el estado temporal se mantiene allí.
- `src/index.css` centraliza los tokens de color y los estilos base; las clases
  Tailwind aplican el layout y los estilos de cada elemento.
- `AGENTS.md` y `SKILL.md` guardan directrices para el agente, no lógica de
  ejecución de la aplicación.

El alias `@/*` apunta a `src/*`. Está declarado para TypeScript y Vite y se
refleja en los aliases de `components.json`, para que tanto el compilador como
los imports generados por shadcn resuelvan componentes bajo `src/`.

## Instrucciones persistentes y skill

### `AGENTS.md`

El archivo raíz `AGENTS.md` contiene las reglas generales que deben respetarse
durante el trabajo en este repositorio:

- React, TypeScript y Vite como stack.
- pnpm como gestor de paquetes obligatorio.
- Datos en `src/data/`, interfaz en `src/components/` y pantalla principal en
  `src/App.tsx`.
- Preferencia por reutilizar componentes shadcn/ui disponibles.
- Definition of Done: validar TypeScript, ejecutar `pnpm lint`, correr el
  formatter si hay un script configurado y evitar archivos temporales.

Estas instrucciones son transversales: se aplican a cualquier tarea del
repositorio, no solo a las que cambian la interfaz.

### Skill de diseño de interfaz

La skill especializada está en
[`.agents/skills/ui-design/SKILL.md`](./.agents/skills/ui-design/SKILL.md).
Indica al agente que, antes de diseñar:

- Compruebe la inicialización de shadcn/ui y Tailwind.
- Revise `src/components/ui/` y reutilice componentes existentes.
- Agregue mediante la CLI solo los componentes shadcn necesarios.
- Mantenga accesibilidad, colores semánticos de Tailwind y diseño responsive.

La skill se aplica cuando la tarea trata sobre la UI; `AGENTS.md` sigue
definiendo las convenciones y verificaciones generales del proyecto.

## Asistencia por IA

GitHub Copilot en VS Code se utilizó como asistente de desarrollo a partir de
pedidos en lenguaje natural. El trabajo incluyó construir la pantalla, integrar
componentes shadcn/ui, seguir las convenciones del proyecto, corregir problemas
de alias y estilos, y ejecutar las verificaciones disponibles.

El agente no reemplaza la revisión de la persona desarrolladora. Las instrucciones
de `AGENTS.md` y la skill delimitan cómo debe abordar las tareas; los cambios
siguen necesitando inspección y validación antes de incorporarse al repositorio.
Copilot tampoco guarda los datos del formulario por sí mismo: la persistencia
requeriría implementar e integrar un servicio o almacenamiento.

## Desarrollo local

Se requiere Node.js compatible con la versión instalada de Vite y pnpm.

```bash
pnpm install
pnpm dev
```

Comandos disponibles:

```bash
pnpm lint     # Ejecuta ESLint
pnpm build    # Comprueba TypeScript y genera la compilación de producción
pnpm preview  # Sirve localmente la compilación generada
```

El proyecto no define actualmente un script de formato.

## Cierre y reflexión

### 1. ¿Dónde debería vivir cada decisión y por qué se separaron?

- **Reglas generales del agente**, como stack, gestor de paquetes, ubicación de
  código y definición de terminado, viven en `AGENTS.md`. Son persistentes y
  relevantes para prácticamente cualquier cambio.
- **Procedimientos especializados de interfaz**, como revisar shadcn, priorizar
  componentes existentes y respetar accesibilidad y responsive, viven en la
  skill de UI. Se separan porque son instrucciones más detalladas y solo hacen
  falta cuando la tarea afecta la interfaz.
- **Configuración de herramientas**, como aliases, dependencias y scripts, vive
  en `components.json`, los `tsconfig`, `vite.config.ts` y `package.json`.
  Debe expresarse en archivos que las herramientas puedan ejecutar o leer, no
  solamente en texto para el agente.
- **Datos de ejemplo** viven en `src/data/`; la **UI** y el estado transitorio
  viven en `src/App.tsx`; los componentes reutilizables viven en
  `src/components/ui/`. Así cada capa tiene una responsabilidad clara y puede
  evolucionar sin duplicar decisiones o acoplar configuración a la pantalla.

### 2. ¿Qué comportamiento del agente cambió a partir de cada incorporación?

- **Al incorporar `AGENTS.md`**, el agente pasó a recibir restricciones
  persistentes del repositorio: usar pnpm, seguir la estructura esperada y
  comprobar tipos y lint antes de dar por terminada una tarea.
- **Al incorporar la skill de UI**, las tareas visuales pasaron a requerir una
  verificación previa de Tailwind/shadcn, inspección de componentes existentes y
  un diseño accesible, semántico y adaptable en vez de inventar controles o
  estilos aislados.
- **Al configurar alias y componentes shadcn**, los imports de interfaz pudieron
  mantenerse consistentes bajo `src/`. La verificación reveló que el alias debía
  estar disponible tanto para TypeScript como para Vite y la CLI de shadcn para
  evitar que se generaran archivos en una carpeta literal `@/` fuera de `src`.
- **Al ejecutar las verificaciones**, los errores de lint y configuración
  dejaron de ser supuestos: se hicieron visibles y se corrigieron antes de
  finalizar los cambios.

En conjunto, estas incorporaciones hicieron que el agente trabajara con más
contexto específico del repositorio, reutilizara mejor el sistema de diseño y
validara sus resultados en lugar de limitarse a producir código.
