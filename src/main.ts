import { RecursoFactory } from './RecursoFactory';
import { supabase } from './supabase';
import { verificarDisponibilidad } from './ValidadorOcupacion';

export async function crearReserva(usuarioId: number, recursoId: number, fecha: string, inicio: string, fin: string) {
    console.log(`--- 🕒 PROCESANDO RESERVA: Recurso ${recursoId} ---`);

    try {
        // 1. VALIDACIÓN DE OCUPACIÓN 
        const estaLibre = await verificarDisponibilidad(recursoId, fecha, inicio, fin);

        if (!estaLibre) {
            console.error("❌ ERROR: El horario seleccionado ya está ocupado.");
            return { success: false, message: "Horario no disponible" };
        }

        // 2. PERSISTENCIA EN DB
        const { data, error } = await supabase
            .from('turnos')
            .insert([
                { 
                    usuario_id: usuarioId, 
                    recurso_id: recursoId, 
                    fecha: fecha,
                    hora_inicio: inicio,
                    hora_fin: fin,
                    confirmado: true 
                }
            ])
            .select();

        if (error) throw error;

        console.log("--- ✅ RESERVA CONFIRMADA ---");
        return { success: true, data };

    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error desconocido";
        console.error("❌ FALLO CRÍTICO:", msg);
        return { success: false, message: msg };
    }
}

