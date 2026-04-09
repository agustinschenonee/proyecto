import { AdminService } from './AdminService';
import { verificarDisponibilidad } from './ValidadorOcupacion';
import { supabase } from './supabase';

/**
 * FUNCIÓN 1: ALTA DE SALAS (Tarea #18)
 * Exclusivo para administradores.
 */
async function ejecutarAltaDeSala() {
    console.log("---  INICIANDO ALTA DE RECURSO ---");
    
    const nuevaSala = {
        nombre: "Sala de Co-Working Misiones",
        capacidad: 12,
        mantenimiento: "2026-07-20",
        horario_disponible: "08:00 a 21:00",
        imagen_url: "https://images.unsplash.com/photo-workspace"
    };

    const resultado = await AdminService.crearNuevaSala(nuevaSala);

    if (resultado.success) {
        console.log("✅ Sala creada con ID:", resultado.sala.id);
    } else {
        console.error("❌ No se pudo crear la sala:", resultado.error);
    }
}

/**
 * FUNCIÓN 2: RESERVA CON VALIDACIÓN 
 * Procesa la lógica de negocio para evitar solapamientos.
 */
async function procesarReservaTurno(uId: number, rId: number, fecha: string, inicio: string, fin: string) {
    console.log(`--- VALIDANDO DISPONIBILIDAD PARA EL ${fecha} ---`);

    try {
        // 1. Verificamos si el horario está libre (Lógica de Lead)
        const libre = await verificarDisponibilidad(rId, fecha, inicio, fin);

        if (!libre) {
            console.warn("🚫 Conflicto de horarios: El recurso ya está reservado.");
            return;
        }

        // 2. Si está libre, insertamos el turno (Tarea #12)
        console.log("✅ Horario libre. Registrando turno en Supabase...");
        const { data, error } = await supabase
            .from('turnos')
            .insert([{ 
                usuario_id: uId, 
                recurso_id: rId, 
                fecha, 
                hora_inicio: inicio, 
                hora_fin: fin, 
                confirmado: true 
            }])
            .select();

        if (error) throw error;
        console.log("✅ Reserva confirmada exitosamente:", data);

    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error desconocido";
        console.error("❌ Fallo crítico en el sistema de turnos:", msg);
    }
}

// --- SECCIÓN DE EJECUCIÓN (Simulacro para Testing de QA) ---

async function testSistema() {
    // Probamos crear una sala primero
    await ejecutarAltaDeSala();

    // Probamos reservar un turno (Usar un ID de sala existente en tu DB)
    // Ejemplo: Usuario 1, Sala 5, el 15 de abril, de 10hs a 12hs
    await procesarReservaTurno(1, 5, "2026-04-15", "10:00", "12:00");
}

testSistema();
