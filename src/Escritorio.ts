// src/modules/resources/Escritorio.ts
import { Recurso } from './Recurso';

export class Escritorio implements Recurso {
    constructor(
        public id: string,
        public nombre: string,
        public capacidad: number = 1 // Por defecto 1 persona
    ) {}

    obtenerDetalles(): string {
        return `Escritorio: ${this.nombre} | Capacidad: ${this.capacidad} persona`;
    }
}
