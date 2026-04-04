import { Observador } from './Observador';

// Cambiá "NotificadorAdmin" por "NotificadorEmail"
export class NotificadorEmail implements Observador {
    actualizar(mensaje: string): void {
        console.log(`[EMAIL] Enviando notificación: ${mensaje}`);
    }
}
