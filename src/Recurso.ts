export interface Recurso {
    id?: number;
    nombre: string;
    capacidad: number;
    tipo: string;
    imagen_url?: string;
    descripcion?: string;
    disponible: boolean;
    mantenimiento?: string;
    horario_disponible?: string; // <--- Nuevo
    obtenerDetalles(): string;
}
