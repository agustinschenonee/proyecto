import { RecursoFactory } from './RecursoFactory';

console.log("--- PRUEBA DE SISTEMA COWORKING ---");

const sala1 = RecursoFactory.crearRecurso('SALA', {
    nombre: "Sala Principal",
    capacidad: 12,
    disponible: true,
    mantenimiento: "2026-05-05"
});

console.log(sala1.obtenerDetalles());
