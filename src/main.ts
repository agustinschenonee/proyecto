// src/main.ts
import { RecursoFactory } from './RecursoFactory';

console.log("--- INICIANDO SISTEMA DE COWORKING ---");

// 1. Usamos la fábrica para crear una Sala (como pediste en tu diagrama)
const salaPrincipal = RecursoFactory.crearRecurso('SALA', {
    id: 'S-101',
    nombre: 'Sala de Conferencias Grande',
    capacidad: 20,
    fechaMantenimiento: '2026-04-15'
});

// 2. Usamos la misma fábrica para crear un Escritorio
const escritorio01 = RecursoFactory.crearRecurso('ESCRITORIO', {
    id: 'E-001',
    nombre: 'Escritorio Ventana Izquierda',
    capacidad: 1
});

// 3. Mostramos los resultados en la consola
console.log(salaPrincipal.obtenerDetalles());
console.log(escritorio01.obtenerDetalles());

console.log("--- FACTORY FUNCIONANDO CORRECTAMENTE ---");
