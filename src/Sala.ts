// src/modules/resources/Sala.ts
import { Recurso } from './Recurso';

export class Sala implements Recurso {
    constructor(
        public id: string,
        public nombre: string,
        public capacidad: number,
        public fechaMantenimiento: string // Viene de tu diagrama
    ) {}

    obtenerDetalles(): string {
        return `Sala: ${this.nombre} | Capacidad: ${this.capacidad} personas | Mantenimiento: ${this.fechaMantenimiento}`;
    }
}
