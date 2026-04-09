import { supabase } from './supabase';

export async function verificarDisponibilidad(
    recursoId: number, 
    fecha: string, 
    horaInicio: string, 
    horaFin: string
): Promise<boolean> {
    
    // Traemos solo los turnos del recurso en esa fecha
    const { data: turnos, error } = await supabase
        .from('turnos')
        .select('hora_inicio, hora_fin')
        .eq('recurso_id', recursoId)
        .eq('fecha', fecha);

    if (error) throw new Error("Error al consultar disponibilidad en Supabase");

    // Algoritmo de traslape: (A_inicio < B_fin) Y (A_fin > B_inicio)
    const hayConflicto = turnos.some(t => (horaInicio < t.hora_fin) && (horaFin > t.hora_inicio));

    return !hayConflicto;
}
