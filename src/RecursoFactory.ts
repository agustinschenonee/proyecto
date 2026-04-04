import { Sala } from './Sala';
import { Escritorio } from './Escritorio';
import { Recurso } from './Recurso';

export class RecursoFactory {
    static crearRecurso(tipo: string, datos: any): Recurso {
        // IMPORTANTE: Si en la DB pusiste "Sala", acá debe decir "Sala"
        switch (tipo.toUpperCase()) {
            case 'SALA':
                return new Sala(datos.nombre, datos.capacidad, datos.disponible, 'SALA', datos.imagen_url, datos.mantenimiento);
            case 'ESCRITORIO':
                return new Escritorio(datos.nombre, datos.capacidad, datos.disponible, 'ESCRITORIO');
            default:
                throw new Error("Tipo de recurso no reconocido.");
        }
    }
}
