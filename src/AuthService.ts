import { supabase } from './supabase';

export class AuthService {
   
    static async esAdmin(usuarioId: number): Promise<boolean> {
        try {
            const { data, error } = await supabase
                .from('usuarios')
                .select('rol')
                .eq('id', usuarioId)
                .single();

            if (error || !data) {
                console.error("🚫 Error de autenticación:", error?.message);
                return false;
            }

            return data.rol === 'admin';
        } catch (err) {
            return false;
        }
    }
}
