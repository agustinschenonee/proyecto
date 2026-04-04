export class Turno {
    constructor(
        public id: number,
        public recursoId: number,
        public usuario: string,
        public fecha: string,
        public estado: string = 'CONFIRMADO'
    ) {}
}
