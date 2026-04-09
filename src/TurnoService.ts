import { supabase } from './supabase';
import { verificarDisponibilidad } from './ValidadorOcupacion';

export class TurnoService {
    
    static async obtenerCalendario(recursoId: number, fecha: string) {
        console.log(`--- 🔍 CONSULTANDO CALENDARIO: Sala ${recursoId} el ${fecha} ---`);
        
        const { data, error } = await supabase
            .from('turnos')
            .select('hora_inicio, hora_fin, usuarios(nombre)') // Join con usuarios para saber quién reservó
            .eq('recurso_id', recursoId)
            .eq('fecha', fecha)
            .order('hora_inicio', { ascending: true });

        if (error) throw error;
        return data;
    }

  
    static async reservarTurno(uId: number, rId: number, fecha: string, inicio: string, fin: string) {
        // Primero validamos disponibilidad 
        const libre = await verificarDisponibilidad(rId, fecha, inicio, fin);

        if (!libre) {
            return { success: false, message: "El horario ya no está disponible." };
        }

        const { data, error } = await supabase
            .from('turnos')
            .insert([{ 
                usuario_id: uId, 
                recurso_id: rId, 
                fecha, 
                hora_inicio: inicio, 
                hora_fin: fin, 
                confirmado: true 
            }])
            .select();

        if (error) return { success: false, message: error.message };

        return { success: true, data: data[0] };
    }
}
