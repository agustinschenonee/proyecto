import { supabase } from './supabase';

export class AuthService {
    /**
     * Verifica si un usuario tiene permisos de administrador.
     *
     */
    static async esAdmin(usuarioId: number): Promise<boolean> {
        const { data, error } = await supabase
            .from('usuarios')
            .select('rol')
            .eq('id', usuarioId)
            .single();

        if (error || !data) return false;
        return data.rol === 'admin';
    }
}
