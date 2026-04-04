import { RecursoFactory } from './RecursoFactory';
import { NotificadorEmail } from './Notificadores';

console.log("--- SISTEMA DE COWORKING DEVpapois ---");

// 1. Creamos una sala usando la Factory
const miSala = RecursoFactory.crearRecurso('SALA', {
    nombre: "Sala Principal Iguazú",
    capacidad: 12,
    disponible: true,
    mantenimiento: "2026-05-15"
});

// 2. Mostramos los detalles en consola
console.log(miSala.obtenerDetalles());

// 3. Probamos el sistema de notificaciones (Observer)
const emailAlert = new NotificadorEmail();
emailAlert.actualizar(`El recurso "${miSala.nombre}" ha sido registrado con éxito.`);

console.log("--- PRUEBA FINALIZADA ---");
