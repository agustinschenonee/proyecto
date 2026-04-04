import { RecursoFactory } from './RecursoFactory';
import { NotificadorEmail } from './Notificadores';
import { supabase } from './supabase';

async function ejecutarCasoDeUso() {
    console.log("--- CASO DE USO: REGISTRAR RECURSO ---");

    // 1. Datos que vienen de la "interfaz" (simulada)
    const datosEntrada = {
        nombre: "Sala de Innovación UCP",
        capacidad: 10,
        disponible: true,
        tipo: 'SALA',
        mantenimiento: "2026-06-15"
    };

    // 2. PATRÓN FACTORY: Creamos el objeto según el tipo
    const nuevoRecurso = RecursoFactory.crearRecurso(datosEntrada.tipo, datosEntrada);
    console.log(`> Objeto tipo ${datosEntrada.tipo} creado exitosamente.`);

    // 3. PERSISTENCIA: Guardamos en Supabase (Punta a Punta)
    console.log("> Conectando con Supabase para persistir...");
    const { data, error } = await supabase
        .from('recursos') 
        .insert([
            { 
                nombre: nuevoRecurso.nombre, 
                capacidad: nuevoRecurso.capacidad, 
                tipo: nuevoRecurso.tipo,
                disponible: nuevoRecurso.disponible
            }
        ])
        .select();

    if (error) {
        console.error("❌ Error en la base de datos:", error.message);
        return;
    }

    // 4. PATRÓN OBSERVER: Notificamos el éxito
    const emailAlert = new NotificadorEmail();
    emailAlert.actualizar(`El recurso "${nuevoRecurso.nombre}" ya está guardado en la nube.`);

    console.log("--- PROCESO FINALIZADO CON ÉXITO ---");
}

ejecutarCasoDeUso();
