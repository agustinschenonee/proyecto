import { Recurso } from './Recurso';

export class Sala implements Recurso {
    constructor(
        public nombre: string,
        public capacidad: number,
        public disponible: boolean = true,
        public tipo: string = 'SALA',
        public imagen_url?: string,
        public mantenimiento?: string,
        public id?: number
    ) {}

    obtenerDetalles(): string {
        return `SALA: ${this.nombre} | Capacidad: ${this.capacidad} | Mantenimiento: ${this.mantenimiento || 'N/A'}`;
    }
}
