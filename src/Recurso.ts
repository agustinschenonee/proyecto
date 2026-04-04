// src/Recurso.ts
export interface Recurso {
    id: string;
    nombre: string;
    capacidad: number;
    obtenerDetalles(): string;
} 
