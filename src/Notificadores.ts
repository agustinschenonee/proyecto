import { Observador } from './Observador';

export class NotificadorAdmin implements Observador {
    actualizar(mensaje: string): void {
        console.log(`[ADMIN NOTIFICACIÓN]: ${mensaje}`);
    }
}

export class NotificadorCalendario implements Observador {
    actualizar(mensaje: string): void {
        console.log(`[CALENDARIO ACTUALIZADO]: Se ha bloqueado el espacio. Detalle: ${mensaje}`);
    }
}
