# AI_LOG.md — Registro de uso de herramientas de IA
**Grupo:** [Nombre del grupo]
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
## Entrada NNN — Semana X

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

## Ejemplos completos

---

## Entrada 001 — Semana 3

**Fecha:** 15/04/2026
**Herramienta:** GitHub Copilot
**Responsable:** Dev Lead — Matías Ruiz
**Eje temático:** Eje 2

**¿Para qué se usó?**
Generar el esqueleto inicial de la clase `TurnoService` aplicando el patrón Strategy para el cálculo de prioridad de turnos.

**¿Qué generó la IA?**
Una clase con tres métodos: `calcularPrioridad()`, `asignarTurno()` y `getAll()`. El esqueleto seguía la estructura básica del patrón Strategy con una interfaz `PrioridadStrategy` y dos implementaciones concretas.

**¿Qué aceptamos tal cual?**
La estructura general de la interfaz `PrioridadStrategy` y la separación en implementaciones concretas `PrioridadNormal` y `PrioridadUrgente`.

**¿Qué modificamos y por qué?**
- Renombramos `calcularPrioridad()` a `calcularNivel()`: el término "nivel" es el que usamos en el diagrama de clases y en el glosario del proyecto. Mantener consistencia con el vocabulario del dominio es parte del diseño.
- Agregamos validación de null en `asignarTurno()`: la IA no contempló el caso en que no haya strategy asignada. Sin esa validación el sistema lanza un NullPointerException en tiempo de ejecución.
- Cambiamos el tipo de retorno de `calcularNivel()` de `int` a `enum NivelPrioridad`: un entero sin contexto semántico es propenso a errores. El enum hace el código más expresivo y más fácil de testear.

**¿Qué descartamos y por qué?**
El método `getAll()` que la IA incluyó en `TurnoService`. No corresponde al patrón Strategy y viola el principio de responsabilidad única: la responsabilidad de listar turnos es del repositorio, no del servicio de cálculo de prioridad.

---

## Entrada 002 — Semana 5

**Fecha:** 29/04/2026
**Herramienta:** Claude
**Responsable:** QA Lead — Carla Ferreira
**Eje temático:** Eje 4

**¿Para qué se usó?**
Generar casos de prueba para la clase `TurnoService` usando clases equivalentes y valores límite, antes de implementar el código (enfoque TDD).

**¿Qué generó la IA?**
Ocho casos de prueba en JUnit 5 cubriendo: turno nulo, turno con prioridad normal, turno con prioridad urgente, turno con tiempo de espera en el límite inferior (0 minutos), en el límite superior (480 minutos) y fuera de rango (-1 y 481 minutos).

**¿Qué aceptamos tal cual?**
Los seis casos de prueba para valores límite (0, 480, -1, 481) y los casos de turno nulo y prioridad normal. La cobertura era correcta y los nombres de los métodos de test seguían la convención `metodoBajoTest_escenario_resultadoEsperado`.

**¿Qué modificamos y por qué?**
- Cambiamos el caso de prioridad urgente: la IA generó el assert esperando que el nivel fuera `2` (entero). Después de refactorizar a `enum NivelPrioridad` en la Entrada 001, el assert correcto es `assertEquals(NivelPrioridad.URGENTE, resultado)`. El test original hubiera compilado pero fallado por tipo incorrecto.
- Agregamos un caso para strategy no asignada (`null`): la IA no lo incluyó aunque agregamos esa validación en el código. Un test que no cubre la validación que agregamos no cumple el objetivo de TDD.

**¿Qué descartamos y por qué?**
Un caso de prueba para `getAll()` que la IA incluyó. Como descartamos ese método en la Entrada 001, el test no tiene sentido. Testear código que no existe ni debería existir genera ruido en el informe de cobertura.

---

## Entrada 003 — Semana 7

**Fecha:** 13/05/2026
**Herramienta:** Claude
**Responsable:** UX Lead — José Paredes
**Eje temático:** Eje 3

**¿Para qué se usó?**
Generar una checklist de verificación de la interfaz de usuario contra los criterios de la norma ISO 9241-11 para la pantalla principal del sistema de turnos.

**¿Qué generó la IA?**
Una checklist de 12 ítems organizados en tres dimensiones: eficacia (¿el usuario puede completar la tarea?), eficiencia (¿con qué esfuerzo?) y satisfacción (¿cómo percibe la experiencia?). Cada ítem tenía una pregunta de verificación y una referencia a la sección de la norma.

**¿Qué aceptamos tal cual?**
La estructura de las tres dimensiones y 9 de los 12 ítems, que eran precisos y aplicables a nuestra interfaz.

**¿Qué modificamos y por qué?**
- Reformulamos el ítem 4 sobre mensajes de error: la IA lo redactó en términos genéricos ("los mensajes son claros"). Lo reemplazamos por una verificación específica de nuestra interfaz: "¿el mensaje de turno vencido indica al usuario la acción que debe tomar a continuación?" La especificidad hace la verificación útil y auditable.
- Agregamos una columna de evidencia a cada ítem: para que la checklist sirva como artefacto de V&V, cada ítem necesita documentar dónde se verificó (número de pantalla o captura). La IA no lo incluyó.

**¿Qué descartamos y por qué?**
Tres ítems sobre accesibilidad para usuarios con discapacidad visual. Si bien son válidos en general, el alcance de nuestro proyecto no incluye ese requisito y auditarlos sin herramientas específicas (lectores de pantalla) no produce evidencia confiable.

---

## Entradas del grupo

<!-- A partir de acá el grupo completa sus propias entradas siguiendo el formato de los ejemplos -->

## Entrada 001 — Semana ___

**Fecha:**
**Herramienta:**
**Responsable:**
**Eje temático:**

**¿Para qué se usó?**


**¿Qué generó la IA?**


**¿Qué aceptamos tal cual?**


**¿Qué modificamos y por qué?**
-

**¿Qué descartamos y por qué?**


---
