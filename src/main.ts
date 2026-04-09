import { AdminService } from './AdminService';
import { verificarDisponibilidad } from './ValidadorOcupacion';
import { supabase } from './supabase';

/**
 * PROCESO DE ALTA 
 */
async function testAltaAdmin() {
    console.log("\n--- TEST: ALTA DE SALA ---");
    try {
        // Suponiendo que el usuario ID 1 es el que hiciste admin en SQL
        const result = await AdminService.crearNuevaSala(1, {
            nombre: "Sala Posadas",
            capacidad: 8,
            horario_disponible: "09:00 a 18:00"
        });
        console.log("✅ Sala creada por admin!");
    } catch (e: any) {
        console.error("❌ Error de seguridad:", e.message);
    }
}

/**
 * PROCESO DE RESERVA 
 */
async function testReserva() {
    console.log("\n--- TEST: RESERVA DE TURNO  ---");
    const reserva = { uId: 1, rId: 5, fecha: "2026-04-10", inicio: "10:00", fin: "12:00" };

    const libre = await verificarDisponibilidad(reserva.rId, reserva.fecha, reserva.inicio, reserva.fin);

    if (libre) {
        const { data } = await supabase.from('turnos').insert([{ 
            usuario_id: reserva.uId, recurso_id: reserva.rId, 
            fecha: reserva.fecha, hora_inicio: reserva.inicio, 
            hora_fin: reserva.fin, confirmado: true 
        }]).select();
        console.log("✅ Reserva realizada:", data);
    } else {
        console.log("🚫 No disponible: Turno ocupado.");
    }
}

// Ejecutamos todo
(async () => {
    await testAltaAdmin();
    await testReserva();
})();
