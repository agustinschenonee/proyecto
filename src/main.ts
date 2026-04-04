import { RecursoFactory } from './RecursoFactory';
import { NotificadorEmail } from './Notificadores';

console.log("--- SISTEMA DE COWORKING DEVpapois ---");

// 1. Creamos el recurso usando tu Factory
const miSala = RecursoFactory.crearRecurso('SALA', {
    nombre: "Sala Principal Iguazú",
    capacidad: 12,
    disponible: true,
    mantenimiento: "2026-05-15"
});

// 2. Probamos que el objeto se creó bien
console.log(miSala.obtenerDetalles());

// 3. (Opcional) Mostramos que el Observer está listo para avisar
const emailAlert = new NotificadorEmail();
emailAlert.actualizar(`La ${miSala.nombre} ya está cargada en el sistema.`);
