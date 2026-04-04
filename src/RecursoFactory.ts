import { Sala } from './Sala';
import { Escritorio } from './Escritorio';
import { Recurso } from './Recurso';

export class RecursoFactory {
    static crearRecurso(tipo: string, datos: any): Recurso {
        // Pasamos todo a mayúsculas para que no haya error si viene "sala" o "SALA"
        switch (tipo.toUpperCase()) {
            case 'SALA':
                return new Sala(
                    datos.nombre, 
                    datos.capacidad, 
                    datos.disponible, 
                    'SALA', 
                    datos.imagen_url, 
                    datos.mantenimiento,
                    datos.id
                );
            case 'ESCRITORIO':
                return new Escritorio(
                    datos.nombre, 
                    datos.capacidad, 
                    datos.disponible, 
                    'ESCRITORIO',
                    datos.imagen_url,
                    datos.id
                );
            default:
                throw new Error("Tipo de recurso no reconocido.");
        }
    }
}
