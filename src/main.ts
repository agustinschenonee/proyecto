// src/main.ts
import { RecursoFactory } from './RecursoFactory';

// Probamos crear una Sala
const salaReunion = RecursoFactory.crearRecurso('SALA', {
    id: '1',
    nombre: 'Sala A - Planta Alta',
    capacidad: 10,
    fechaMantenimiento: '2026-05-10'
});

// Probamos crear un Escritorio
const escritorioSencillo = RecursoFactory.crearRecurso('ESCRITORIO', {
    id: '2',
    nombre: 'Puesto 04',
    capacidad: 1
});

console.log(salaReunion.obtenerDetalles());
console.log(escritorioSencillo.obtenerDetalles());
