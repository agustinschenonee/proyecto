# Estrategia de Pruebas y Calidad - GRUPO DEVpapois

## Las 3 situaciones críticas del sistema de coworking:

1: Colisión de reservas:
El sistema falla cuando 2 usuarios hacen una reserva del mismo espacio en el mismo horario y fecha.
Esta situación tiene 2 posibles consecuencias, una es que ambos turnos se agenden en la base de datos con la misma fecha y horario, la otra posible consecuencia es que se dé el confirmado del turno a ambos usuarios en la página pero solamente se registre un turno.

2: Inconsistencia de la disponibilidad:
El sistema puede mostrar como disponibles salas que están ocupadas en la base de datos, lo que puede provocar malentendidos entre los usuarios, este error puede producirse si el patrón observer no realiza su función correcta actualizando la agenda de disponibilidad.

3: Fallo de privilegios:
El sistema falla al asignar el rol de usuario y administrador dándole privilegios inconsistentes con el rol habitual, por ejemplo el poder ver y modificar las reservas de otros usuarios e incluso crear y eliminar salas. Esto podría alteraría por completo el funcionamiento del sistema


1. ¿Qué es una prueba unitaria?
En términos sencillos, una prueba unitaria consiste en aislar la pieza más pequeña de código que sea lógica (función o un método) y verificar que se comporte como esperamos. El objetivo principal es asegurarnos de que, ante una entrada específica, el resultado sea el correcto, sin que intervengan otros elementos del sistema como bases de datos o APIs externas. Esto nos permite detectar errores de forma temprana y facilitar el mantenimiento del código a largo plazo.

2. Herramientas para TypeScript
Para el ecosistema de TypeScript, existen varias opciones sólidas que se integran muy bien con el tipado estático:

Jest: Es la herramienta más popular. Es robusta, incluye todo lo necesario (test runner, aserciones y mocks) en un solo paquete y tiene una integración excelente con TypeScript a través de ts-jest.

Vitest: Una alternativa moderna y extremadamente rápida, diseñada para proyectos que utilizan Vite. Es compatible con la API de Jest, lo que facilita mucho la migración entre ambos.

Mocha: Un framework más clásico y flexible que permite elegir qué biblioteca de aserciones usar aunque requiere un poco más de configuración inicial.
 
3. Ejemplo de un test simple

Para escribir un test básico, primero necesitamos la lógica a probar y luego el archivo de prueba que verifique su funcionamiento. En este caso, utilizaremos una sintaxis estándar compatible con Jest o Vitest.

Archivo de lógica (math.ts): 

export const sumar = (a: number, b: number): number => {
  return a + b;
};
Archivo de prueba (math.test.ts):

 
import { sumar } from './math';

describe('Pruebas en el módulo math', () => {
  test('la función sumar debería retornar 5 al recibir 2 y 3', () => {
    // 1. Definimos los datos de entrada
    const num1 = 2;
    const num2 = 3;

    // 2. Ejecutamos la función
    const resultado = sumar(num1, num2);

    // 3. Verificamos el resultado (Aserción)
    expect(resultado).toBe(5);
  });
});
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


* ### III. Pruebas de Componentes y de Sistema

* **Componente Significativo:**
    Elegimos el **Motor de Reservas (`TurnoService.ts`)**. Este componente es una pieza clave que coordina la validación de disponibilidad (a través del `ValidadorOcupacion`), la creación del objeto mediante `RecursoFactory` y la ejecución de la lógica de guardado.

* **Prueba del componente de forma aislada:**
    * **Entradas:** Un objeto con los datos de la reserva (ID de usuario, ID de espacio, fecha y rango horario).
    * **Salidas esperadas:** La creación de un registro de turno válido y la activación del patrón *Observer* para notificar a los interesados.
    * **Entorno necesario:** Se requiere un entorno de pruebas con una instancia de Supabase (o un simulador) que contenga datos de espacios previamente cargados para validar los cruces de horarios.

* **Prueba de Sistema: Flujo Completo:**
    1.  **Ingreso:** El usuario se autentica exitosamente. **Validación:** Redirección al panel de control con el rol asignado.
    2.  **Selección:** El usuario filtra espacios por "Sala de reuniones" y elige un horario libre. **Validación:** El sistema responde con la disponibilidad en tiempo real.
    3.  **Reserva:** El usuario confirma la operación. **Validación:** Se genera el turno, el espacio cambia su estado a "Ocupado" para otros usuarios y se emite la notificación correspondiente.

* **Herramientas End-to-End:**
    * **Selenium:** Es la herramienta más antigua; permite mucha compatibilidad pero es lenta y difícil de configurar.
    * **Playwright:** Es muy rápido y moderno, ideal para pruebas en múltiples navegadores.
    * **Cypress:** Ofrece una experiencia de desarrollo superior con recarga instantánea y una interfaz visual clara.
    * **Elección:** **Cypress**. Lo elegimos por su facilidad para integrarse con aplicaciones web modernas y porque permite a nuestro equipo de UX validar la claridad del flujo mientras se ejecutan las pruebas.



### IV. Pruebas de Regresión y de Estrés

* **Estrategia de Regresión:**
    Ante cada cambio en el código, ejecutaremos automáticamente el conjunto total de pruebas unitarias e integración.
    * **Integración CI/CD:** Configuraremos un flujo en **GitHub Actions** que se dispare con cada *Push* o *Pull Request*. Si los tests no pasan (por ejemplo, si una mejora en el sistema de usuarios rompe el motor de reservas), el código no podrá integrarse a la rama principal.

* **Escenario de Estrés:**
    Planteamos una situación de carga extrema real: **1000 solicitudes de turno en el primer minuto de habilitación** de la agenda (lunes a las 08:00 AM), simulando el pico de demanda.

* **Herramientas de Estrés:**
    * **JMeter:** Es muy potente pero su interfaz basada en Java es compleja de mantener.
    * **Locust:** Es escalable pero requiere conocimientos en Python.
    * **k6:** Es la opción más moderna y eficiente.
    * **Justificación:** **k6** es el más apropiado porque permite escribir los escenarios de carga en JavaScript/TypeScript. Esto mantiene la coherencia tecnológica con el resto de nuestro proyecto y facilita que cualquier desarrollador del grupo pueda ajustar los parámetros de la prueba.

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

