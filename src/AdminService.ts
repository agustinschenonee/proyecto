import { RecursoFactory } from './RecursoFactory';
import { supabase } from './supabase';
import { AuthService } from './AuthService';

export class AdminService {
    static async crearNuevaSala(adminId: number, datos: any) {
        // --- VALIDACIÓN DE ROL  ---
        const autorizado = await AuthService.esAdmin(adminId);
        if (!autorizado) {
            throw new Error("Acceso denegado: Se requieren permisos de administrador.");
        }

        console.log(`--- 🔐 ADMIN AUTORIZADO: Creando ${datos.nombre} ---`);

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
    }
}
