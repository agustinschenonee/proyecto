import { RecursoFactory } from './RecursoFactory.ts';
import { NotificadorEmail } from './Notificadores.ts';
import { supabase } from './supabase.ts';

// 1. Definimos la función
async function registrarEspacio() {
    console.log("--- 🏢 INICIANDO CASO DE USO ---");

    const datos = {
        nombre: "Sala de Conferencias Posadas",
        capacidad: 20,
        disponible: true,
        tipo: 'SALA',
        mantenimiento: "2026-06-15" 
    };

    try {
        const miRecurso = RecursoFactory.crearRecurso(datos.tipo, datos);
        console.log(`> Objeto '${miRecurso.nombre}' generado localmente.`);

        console.log("> Conectando con Supabase...");
        const { error } = await supabase
            .from('recursos')
            .insert([
                { 
                    nombre: miRecurso.nombre, 
                    capacidad: miRecurso.capacidad, 
                    tipo: datos.tipo,
                    disponible: miRecurso.disponible,
                    mantenimiento: datos.mantenimiento 
                }
            ]);

        if (error) {
            console.error("❌ Error en base de datos:", error.message);
            return;
        }

        const notificador = new NotificadorEmail();
        notificador.actualizar(`El recurso "${miRecurso.nombre}" se registró correctamente.`);
        console.log("--- ✅ PROCESO FINALIZADO CON ÉXITO ---");

    } catch (err) {
        console.error("❌ Error inesperado:", err);
    }
}

// 2. ¡LLAMAMOS A LA FUNCIÓN PARA QUE ARRANQUE!
registrarEspacio();
