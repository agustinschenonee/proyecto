# Estrategia de Pruebas y Calidad - GRUPO DEVpapois

## 1. Situaciones Críticas del Sistema de Coworking
Identificamos los tres puntos de mayor riesgo para el correcto funcionamiento de nuestra plataforma:

* **Colisión de reservas:** El sistema falla cuando 2 usuarios hacen una reserva del mismo espacio en el mismo horario y fecha. Esta situación tiene 2 posibles consecuencias: una es que ambos turnos se agenden en la base de datos con la misma fecha y horario; la otra es que se dé el confirmado del turno a ambos usuarios en la página pero solamente se registre un turno.
* **Inconsistencia de la disponibilidad:** El sistema puede mostrar como disponibles salas que están ocupadas en la base de datos. Este error puede producirse si el patrón **Observer** no realiza su función correcta actualizando la agenda de disponibilidad.
* **Fallo de privilegios:** El sistema falla al asignar el rol de usuario y administrador dándole privilegios inconsistentes, permitiendo ver y modificar reservas ajenas o eliminar salas. Esto alteraría por completo el funcionamiento del sistema.

---

## 2. Desarrollo de la Guía Técnica

### I. Pruebas Unitarias (Clases de equivalencia, valores límite)
**¿Qué es una prueba unitaria?**
Consiste en aislar la pieza más pequeña de código que sea lógica (función o método) y verificar que se comporte como esperamos ante una entrada específica, sin que intervengan otros elementos como bases de datos.

* **Módulo elegido:** `ValidadorOcupacion.ts` (Validar disponibilidad horaria).
* **Definición de parámetros de entrada:**
    * **Clases de Equivalencia:**
        * Válidas: Rangos horarios que no se solapan con reservas existentes.
        * Inválidas: Horarios superpuestos, duración de 0 minutos o negativa.
    * **Valores Límite (Fronteras):** Si una reserva termina a las 14:00, probamos una nueva que inicie exactamente a las 14:00 (límite válido) o a las 13:59 (límite inválido).

**Casos de Prueba:**
1. **Entrada:** 10:00 a 11:00 (Espacio libre). **Resultado esperado:** Retorna `true`.
2. **Entrada:** 10:30 a 11:30 (Choque con turno de 10 a 11). **Resultado esperado:** Retorna error de colisión.
3. **Entrada:** 15:00 a 15:00 (Duración cero). **Resultado esperado:** Retorna error de rango inválido.

**Framework recomendado: Vitest.**
Es una alternativa moderna y extremadamente rápida diseñada para proyectos con Vite y TypeScript. Lo elegimos porque ofrece configuración casi nula, es más liviano que Jest y permite una ejecución instantánea.

### II. Pruebas de Integración (Mocks / Stubs)
* **Dependencias externas:** 1. **Supabase** (Base de datos).
    2. **AuthService** (Servicio de autenticación).
* **Uso de Mocks/Stubs:** Utilizaremos Stubs para simular la respuesta de Supabase. Esto aisla el componente para probar si la lógica de negocio reacciona bien ante un éxito o un error de la base de datos sin conectarse a internet.

* 
| Nivel de prueba | Herramienta elegida | ¿Qué automatiza en su proyecto? | Justificación (por qué es la mejor opción gratuita) |
| :--- | :--- | :--- | :--- |
| **Unitarias** | **Vitest** | Valida funciones de lógica pura, como el `ValidadorOcupacion.ts` y el cálculo de costos. | Es extremadamente rápido y detecta automáticamente la configuración de TypeScript de nuestro repositorio sin herramientas extra. |
| **Integración** | **Vitest** | Simula la comunicación entre los servicios (`TurnoService.ts`) y la base de datos de Supabase usando Mocks. | Permite aislar el código sin depender de una conexión a internet, siendo más ligero y práctico que configurar servidores externos. |
| **Sistema / E2E** | **Cypress** | Simula el recorrido completo del usuario: Login, búsqueda de espacio y confirmación de la reserva en el navegador. | Ofrece una interfaz visual gratuita que permite ver fallos en tiempo real, facilitando la validación de la experiencia de usuario (UX). |
| **Estrés** | **k6** | Simula la carga masiva de 500+ usuarios intentando reservar un coworking al mismo tiempo. | Los scripts se escriben en JavaScript, lo que permite que cualquier miembro del equipo pueda crearlos sin aprender un nuevo lenguaje. |


**Ejemplo (Pseudocódigo):**
```typescript
// Reemplazamos el guardado real por uno simulado (Stub)
vi.mock('supabase', () => ({ insert: () => ({ error: null }) }));

// Ejecutamos flujo: reserva + notificación
const resultado = TurnoService.confirmarReserva(datos);

// Validamos que se llamó al servicio de notificación tras el éxito
expect(Notificadores.enviarEmail).toHaveBeenCalled();

### Cuadro Comparativo: Stack Definitivo de Automatización

