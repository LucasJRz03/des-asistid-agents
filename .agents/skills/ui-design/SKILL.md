# Skill: Diseño de Interfaces con shadcn/ui

## CUÁNDO UTILIZAR ESTA SKILL
Consultar estas instrucciones cada vez que la tarea implique crear, rediseñar o modificar la interfaz de usuario (UI), agregar nuevos componentes visuales o alterar estilos.

## 1. VERIFICACIÓN DE CONFIGURACIÓN
Antes de comenzar a diseñar, el agente debe comprobar si `shadcn/ui` y Tailwind CSS ya están inicializados en el proyecto (buscar `components.json` y `tailwind.config.js`). Si no están configurados, el agente DEBE instalarlos e inicializarlos antes de escribir código de componentes.

## 2. REVISIÓN Y REUTILIZACIÓN DE COMPONENTES
- **Regla de oro:** No reinventar la rueda. 
- Antes de instalar o crear un componente visual (ej. un botón o tarjeta), revisar la carpeta `src/components/ui/` para ver si el componente ya existe.
- Si existe, importarlo y reutilizarlo.
- Si no existe y forma parte del catálogo de shadcn/ui, incorporarlo usando la CLI (ej. `pnpm dlx shadcn@latest add button`).
- Incorporar **solamente** los componentes estrictamente necesarios para la tarea actual, para no inflar el repositorio con código sin uso.

## 3. CRITERIOS DE CALIDAD VISUAL
- **Accesibilidad:** Los componentes deben ser semánticos, legibles y navegables por teclado (apoyarse en las primitivas base de shadcn/ui).
- **Consistencia Visual:** Utilizar el sistema de colores de Tailwind (`bg-primary`, `text-muted-foreground`, etc.) en lugar de colores "duros" (hexadecimales) para mantener soporte automático de modo claro/oscuro.
- **Responsive:** El comportamiento de la interfaz debe adaptarse a pantallas pequeñas y grandes utilizando los prefijos de Tailwind (`sm:`, `md:`, `lg:`).