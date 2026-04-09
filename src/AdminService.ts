import { RecursoFactory } from './RecursoFactory';
import { supabase } from './supabase';
import { AuthService } from './AuthService'; // Importamos el validador de roles

export class AdminService {
    static async crearNuevaSala(adminId: number, datos: any) {
        
        // --- 🛡️ CONTROL DE ACCESO  ---
        const autorizado = await AuthService.esAdmin(adminId);
        
        if (!autorizado) {
            console.error("🛑 INTENTO DE ACCESO NO AUTORIZADO");
            return { success: false, error: "Permisos insuficientes. Se requiere rol de Administrador." };
        }

       
        try {
            const nuevaSala = RecursoFactory.crearRecurso('SALA', { ...datos, disponible: true });

            const { data, error } = await supabase
                .from('recursos')
                .insert([{ 
                    nombre: nuevaSala.nombre, 
                    capacidad: nuevaSala.capacidad, 
                    tipo: 'SALA',
                    mantenimiento: nuevaSala.mantenimiento,
                    horario_disponible: datos.horario_disponible,
                    disponible: true
                }])
                .select();

            if (error) throw error;
            return { success: true, sala: data[0] };
            
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    }
}
