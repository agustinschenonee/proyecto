# AI_LOG.md — Registro de uso de herramientas de IA
**Grupo:** Dev Papois
**Proyecto:** [Nombre del sistema]
**Materia:** Ingeniería de Software II · UCP · 2026

---

## Cómo completar este archivo

Cada vez que el grupo use una herramienta de IA (Claude, GitHub Copilot, ChatGPT, Gemini u otra) tienen que agregar una entrada en este archivo **antes de hacer el commit** con ese código o artefacto.

**Una entrada por uso, no por semana.** Si en una sesión usaron IA tres veces para tres cosas distintas, son tres entradas.

El archivo se revisa en el coloquio del TP1, TP2 e Integrador. Cualquier integrante puede ser preguntado sobre cualquier entrada. Si no podés explicar lo que figura acá, afecta tu nota individual.

---

## Formato de cada entrada

```
## Entrada 1 — Semana X

**Fecha:** DD/MM/AAAA
**Herramienta:** [Claude / GitHub Copilot / ChatGPT / Gemini / otra]
**Responsable:** [Rol] — [Nombre y apellido]
**Eje temático:** [Eje 1 / Eje 2 / Eje 3 / Eje 4 / Eje 5]

**¿Para qué se usó?**
[Descripción breve de la tarea o problema]

**¿Qué generó la IA?**
[Descripción de lo que produjo: código, diagrama, texto, casos de prueba, etc.]

**¿Qué aceptamos tal cual?**
[Lo que se usó sin modificar, o "Nada" si todo fue modificado]

**¿Qué modificamos y por qué?**
- [Cambio 1]: [Justificación técnica]
- [Cambio 2]: [Justificación técnica]

**¿Qué descartamos y por qué?**
[Lo que la IA generó pero el grupo decidió no usar, con justificación]
```

---

## Entradas

---

## Entrada 001 — Semana 1

**Fecha:** 19/03/2026
**Herramienta:** Gemini 
**Responsable:** Scrum Master (Agustín Schenone) / QA Lead 
**Eje temático:** Eje 1

**¿Para qué se usó?**
Clarificar las responsabilidades del rol de Scrum Master y de los demás integrantes del equipo para el Sprint 0.

Configurar la estructura técnica del repositorio y las columnas obligatorias del tablero Kanban.

Redactar el Contrato de Proyecto cumpliendo con la extensión mínima de 5 líneas por sección y los temas solicitados.

Entender el flujo de trabajo colaborativo en GitHub (Pull, Commit, Push) y la gestión de visibilidad de los proyectos.

**¿Qué generó la IA?**
Una guía detallada sobre las obligaciones de gestión (Scrum Master) frente a las técnicas (Dev Lead, QA Lead, UX Lead).

La lista de las 8 tarjetas iniciales requeridas para el Backlog con sus respectivos ejes temáticos y responsables.

Una propuesta de redacción para las cuatro secciones del Contrato de Proyecto basada en el escenario de la Opción C (Coworking).

Instrucciones paso a paso para la creación de etiquetas (Labels) y la visibilidad de campos en GitHub Projects.

**¿Qué aceptamos tal cual?**

Nada

**¿Qué modificamos y por qué?**
Se ajustaron los títulos de las tarjetas del tablero para incluir la semana objetivo y el eje programático dentro del texto para mayor claridad visual.

Se validó que el nombre del repositorio respetara el formato estricto de minúsculas y guiones requerido por la guía.

Se filtró la información sobre permisos de "Solo lectura" en GitHub para adaptarla a las limitaciones reales de las cuentas personales de los alumnos.

Se verificó que el contenido del contrato reflejara fielmente los acuerdos internos de comunicación (WhatsApp/Discord) definidos por el grupo.
**¿Qué descartamos y por qué?**
Nada
---
# Registro de Uso de IA 

**Herramienta utilizada:** Gemini (Google).

### Partes generadas con IA:
* Estructura base de los patrones Factory y Observer en TypeScript.
* Configuración inicial de interfaces y moldes de clases (`Recurso`, `Sala`, `Escritorio`).
* Scripts de resolución de errores de entorno (políticas de ejecución de PowerShell y configuración de `tsx`).

### Modificaciones realizadas por el equipo:
* Adaptación de los campos de las interfaces para que coincidan con la tabla de Supabase (id, imagen_url, mantenimiento).
* Corrección de rutas de importación y extensiones de archivo (`.ts`) para compatibilidad con Node.js ESM.
* Personalización de los mensajes de salida en consola para el contexto de DEVpapois.

### Justificación de uso:
Se utilizó la IA para acelerar la configuración del entorno de desarrollo y generar el código "boilerplate" (repetitivo), permitiendo al equipo enfocarse en la lógica de negocio y en la arquitectura de los patrones de diseño.

