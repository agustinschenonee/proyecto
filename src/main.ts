import { RecursoFactory } from './RecursoFactory';
import { supabase } from './supabase';

async function registrarEspacio() {
    console.log("--- 🏢 INICIANDO CASO DE USO ---");

    const datos = {
        nombre: "Sala de Conferencias Posadas",
        capacidad: 20,
        disponible: true,
        tipo: 'SALA',
        mantenimiento: "2026-06-15",
        horario_disponible: "08:00 a 20:00" 
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
                    mantenimiento: datos.mantenimiento,
                    horario_disponible: datos.horario_disponible // <--- Sincronizado con la DB
                }
            ]);

        if (error) {
            console.error("❌ Error en base de datos:", error.message);
            return;
        }

        console.log("--- ✅ PROCESO FINALIZADO CON ÉXITO ---");

    } catch (err) {
        console.error("❌ Error inesperado:", err);
    }
}

registrarEspacio();
