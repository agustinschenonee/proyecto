// src/RecursoFactory.ts
import { Recurso } from './Recurso';
import { Sala } from './Sala';
import { Escritorio } from './Escritorio';

export class RecursoFactory {
    static crearRecurso(tipo: string, datos: any): Recurso {
        if (tipo === 'SALA') {
            return new Sala(datos.id, datos.nombre, datos.capacidad, datos.fechaMantenimiento);
        }
        if (tipo === 'ESCRITORIO') {
            return new Escritorio(datos.id, datos.nombre, datos.capacidad);
        }
        throw new Error("Tipo de recurso no reconocido");
    }
}
