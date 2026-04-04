import { RecursoFactory } from './RecursoFactory';
import { NotificadorEmail } from './Notificadores';
import { supabase } from './supabase';

async function registrarEspacio() {
    console.log("--- CASO DE USO: REGISTRAR RECURSO EN NUBE ---");

    // 1. Datos del nuevo recurso (Simulando entrada de usuario)
    const datos = {
        nombre: "Sala de Conferencias Posadas",
        capacidad: 20,
        disponible: true,
        tipo: 'SALA'
    };

    // 2. Uso del patrón FACTORY
    const miRecurso = RecursoFactory.crearRecurso(datos.tipo, datos);
    console.log(`> Objeto '${miRecurso.nombre}' generado localmente.`);

    // 3. Persistencia Real en Supabase (Punta a Punta)
    console.log("> Conectando con la base de datos remota...");
    const { error } = await supabase
        .from('recursos')
        .insert([
            { 
                nombre: miRecurso.nombre, 
                capacidad: miRecurso.capacidad, 
                tipo: datos.tipo,
                disponible: miRecurso.disponible 
            }
        ]);

    if (error) {
        console.error("❌ Error al guardar en Supabase:", error.message);
        return;
    }

    // 4. Uso del patrón OBSERVER
    const notificador = new NotificadorEmail();
    notificador.actualizar(`El recurso "${miRecurso.nombre}" se registró correctamente en la nube.`);

    console.log("--- ✅ PROCESO FINALIZADO CON ÉXITO ---");
}

registrarEspacio();
