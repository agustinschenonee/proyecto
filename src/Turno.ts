import { Observador } from './Observador';

export class Turno {
    private observadores: Observador[] = [];

    constructor(
        public id: string,
        public fecha: string,
        public horario: string,
        public estado: string = 'pendiente'
    ) {}

    // Métodos del patrón Observer
    agregarObservador(obs: Observador) {
        this.observadores.push(obs);
    }

    notificar(mensaje: string) {
        this.observadores.forEach(obs => obs.actualizar(mensaje));
    }

    confirmarTurno() {
        this.estado = 'confirmado';
        this.notificar(`¡Turno ${this.id} CONFIRMADO para el ${this.fecha} a las ${this.horario}!`);
    }
}
