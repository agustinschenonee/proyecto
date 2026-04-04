import { Recurso } from './Recurso';

// 1. Cambiamos el nombre de la clase a Escritorio
export class Escritorio implements Recurso {
    constructor(
        public nombre: string,
        public capacidad: number,
        public disponible: boolean = true,
        // 2. El tipo por defecto ahora es 'ESCRITORIO'
        public tipo: string = 'ESCRITORIO', 
        public imagen_url?: string,
        public id?: number
    ) {}

    obtenerDetalles(): string {
        // 3. Cambiamos el texto para que diga ESCRITORIO
        return `ESCRITORIO: ${this.nombre} | Capacidad: ${this.capacidad} | Puesto: ${this.id || 'S/N'}`;
    }
}
