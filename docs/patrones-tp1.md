# Informe de Patrones de Diseño - TP1
**Proyecto:** Sistema de Coworking DEVpapois  
**Integrantes:** Prisci Galeano y Valentina Carabajal

---

## 1. Patrón Factory Method
* **Intención:** Centralizar la lógica de creación de objetos para que el sistema sea independiente de cómo se instancian sus clases.
* **Problema que resuelve:** Evita que el código de ejecución (`main.ts`) tenga que conocer los detalles internos de cada clase (`Sala`, `Escritorio`). Sin esto, el código estaría lleno de llamadas directas a `new`, dificultando el mantenimiento.
* **Justificación:** Se eligió para manejar los datos provenientes de Supabase. La fábrica recibe un "tipo" de recurso y devuelve el objeto correcto con su comportamiento específico.
* **Ejemplo en el código:**
    ```typescript
    // En src/RecursoFactory.ts
    static crearRecurso(tipo: string, datos: any): Recurso {
        if (tipo === 'SALA') return new Sala(datos.nombre, datos.capacidad, datos.disponible);
        // ... lógica de creación
    }
    ```

## 2. Patrón Observer
* **Intención:** Notificar cambios de estado a múltiples objetos interesados de forma automática y desacoplada.
* **Problema que resuelve:** Permite ejecutar acciones secundarias (como enviar un mail de confirmación) sin "ensuciar" la lógica principal de creación del recurso.
* **Justificación:** Se implementó para que el sistema sea escalable. Hoy enviamos una notificación por consola (`NotificadorEmail`), pero mañana podemos agregar SMS o Slack sin tocar las clases del dominio.
* **Ejemplo en el código:**
    ```typescript
    // En src/main.ts
    const emailAlert = new NotificadorEmail();
    emailAlert.actualizar(`El recurso "${miSala.nombre}" ha sido registrado.`);
    ```
    ### Persistencia Real:
Se configuró un cliente de **Supabase** para lograr que el caso de uso sea funcional de "punta a punta", guardando la información en la nube.
