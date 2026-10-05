# Reglas del Proyecto

## STACK
- Frontend: React, TypeScript, Vite.
- Gestor de paquetes OBLIGATORIO: pnpm. No utilizar npm ni yarn.

## ESTRUCTURA
- `src/components/`: Componentes visuales y de interfaz.
- `src/data/`: Datos estáticos o simulados (ej. `activities.ts`).
- `src/App.tsx`: Componente raíz de la aplicación.

## CONVENCIONES
- Uso del sistema de diseño: Este proyecto utiliza `shadcn/ui`. 
- Reutilización: Se debe priorizar el uso de componentes de UI existentes antes de crear soluciones manuales con estilos propios a medida.

## DEFINITION OF DONE
Antes de declarar una tarea como "Done", el agente DEBE obligatoriamente:
1. Asegurarse de que el código no tenga errores de TypeScript.
2. Ejecutar el linter (`pnpm lint`) y corregir cualquier error o advertencia.
3. Ejecutar el formatter si existe el script de formato.
4. No incluir archivos innecesarios ni logs de prueba olvidados.