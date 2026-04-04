async function registrarEspacio() {
    console.log("--- 🏢 CASO DE USO: REGISTRAR RECURSO EN NUBE ---");

    // 1. Datos (Agregamos mantenimiento)
    const datos = {
        nombre: "Sala de Conferencias Posadas",
        capacidad: 20,
        disponible: true,
        tipo: 'SALA',
        mantenimiento: "05-05-2026" // <-- Agregamos esta línea
    };

    const miRecurso = RecursoFactory.crearRecurso(datos.tipo, datos);
    console.log(`> Objeto '${miRecurso.nombre}' generado localmente.`);

    console.log("> Conectando con la base de datos remota...");
    const { error } = await supabase
        .from('recursos')
        .insert([
            { 
                nombre: miRecurso.nombre, 
                capacidad: miRecurso.capacidad, 
                tipo: datos.tipo,
                disponible: miRecurso.disponible,
                mantenimiento: datos.mantenimiento // <-- ¡Esta es la clave!
            }
        ]);

    if (error) {
        console.error("❌ Error al guardar en Supabase:", error.message);
        return;
    }

    const notificador = new NotificadorEmail();
    notificador.actualizar(`El recurso "${miRecurso.nombre}" se registró correctamente en la nube.`);

    console.log("--- ✅ PROCESO FINALIZADO CON ÉXITO ---");
}
