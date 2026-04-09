import { RecursoFactory } from './RecursoFactory';
import { supabase } from './supabase';

export class AdminService {
    
    static async crearNuevaSala(datos: {
        nombre: string,
        capacidad: number,
        mantenimiento: string,
        horario_disponible: string,
        imagen_url?: string
    }) {
        console.log(`--- 🔐 MÓDULO ADMIN: Creando sala ${datos.nombre} ---`);

        try {
            // 1. Usamos la Factory para instanciar (Patrones)
            // Agregamos valores por defecto para los campos que la Factory pide
            const nuevaSala = RecursoFactory.crearRecurso('SALA', {
                ...datos,
                disponible: true
            });

            // 2. Persistencia en Supabase
            const { data, error } = await supabase
                .from('recursos')
                .insert([
                    { 
                        nombre: nuevaSala.nombre, 
                        capacidad: nuevaSala.capacidad, 
                        tipo: 'SALA',
                        disponible: nuevaSala.disponible,
                        mantenimiento: nuevaSala.mantenimiento,
                        horario_disponible: datos.horario_disponible, // Tu columna nueva
                        imagen_url: nuevaSala.imagen_url
                    }
                ])
                .select();

            if (error) throw error;

            console.log("✅ ÉXITO: Sala persistida en la base de datos.");
            return { success: true, sala: data[0] };

        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Error desconocido";
            console.error("❌ FALLO EN ALTA DE SALA:", msg);
            return { success: false, error: msg };
        }
    }
}
