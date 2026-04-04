import { Observador } from './Observador';

// El nombre de la clase DEBE ser NotificadorEmail
export class NotificadorEmail implements Observador {
    actualizar(mensaje: string): void {
        console.log(`[NOTIFICACIÓN] ${mensaje}`);
    }
}
