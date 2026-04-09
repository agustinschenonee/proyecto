import { supabase } from './supabase';

/**
 * Lógica de Negocio: Verifica si un recurso está disponible en un rango horario.
 * @returns true si está libre, false si hay solapamiento.
 */
export async function estaDisponible(
    recursoId: number, 
    fecha: string, 
    horaInicio: string, 
    horaFin: string
): Promise<boolean> {
    
    console.log(`> [Dev Lead] Validando disponibilidad: Recurso ${recursoId} el ${fecha}`);

    // 1. Consultamos todos los turnos para ese recurso en esa fecha específica
    const { data: turnosExistentes, error } = await supabase
        .from('turnos')
        .select('hora_inicio, hora_fin')
        .eq('recurso_id', recursoId)
        .eq('fecha', fecha);

    if (error) {
        console.error("❌ Error al consultar disponibilidad:", error.message);
        return false; // Por seguridad, si falla la consulta, no permitimos reservar
    }

    // 2. Algoritmo de Solapamiento (Overlap)
    // Existe choque si: (Nueva_Inicio < Existente_Fin) Y (Nueva_Fin > Existente_Inicio)
    const hayChoque = turnosExistentes.some(turno => {
        const choque = (horaInicio < turno.hora_fin) && (horaFin > turno.hora_inicio);
        if (choque) {
            console.warn(`⚠️ Choque detectado con turno existente: ${turno.hora_inicio} a ${turno.hora_fin}`);
        }
        return choque;
    });

    return !hayChoque;
}
