import { RecursoFactory } from './RecursoFactory.ts'; // Agregamos .ts
import { NotificadorEmail } from './Notificadores.ts'; // Agregamos .ts

console.log("--- SISTEMA DE COWORKING DEVpapois ---");

// 1. Creamos la sala
const miSala = RecursoFactory.crearRecurso('SALA', {
    nombre: "Sala Principal",
    capacidad: 12,
    disponible: true,
    mantenimiento: "2026-05-15"
});

// 2. Mostramos detalles
console.log(miSala.obtenerDetalles());

// 3. Probamos el Observer
const emailAlert = new NotificadorEmail();
emailAlert.actualizar(`La ${miSala.nombre} ya está cargada en el sistema.`);

console.log("--- PRUEBA FINALIZADA ---");
export {};

