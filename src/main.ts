import { AdminService } from './AdminService';
import { TurnoService } from './TurnoService';
import { verificarDisponibilidad } from './ValidadorOcupacion';
import { supabase } from './supabase';

/**
 * 🏢 SECCIÓN 1: GESTIÓN DE RECURSOS 
 * Solo ejecutable por usuarios con rol 'admin'.
 */
async function realizarAltaDeSala(adminId: number) {
    console.log("\n--- [ADMIN] INICIANDO ALTA DE SALA (#18) ---");
    
    const datosNuevaSala = {
        nombre: "Sala de Innovación Oberá",
        capacidad: 10,
        mantenimiento: "2026-08-15",
        horario_disponible: "08:00 a 22:00",
        imagen_url: "https://ejemplo.com/sala-obera.jpg"
    };

    try {
        // El AdminService ya valida el Rol interno 
        const resultado = await AdminService.crearNuevaSala(adminId, datosNuevaSala);
        
        if (resultado.success) {
            console.log("✅ ÉXITO: Sala creada con ID:", resultado.sala.id);
        }
    } catch (error: any) {
        console.error("❌ ERROR DE AUTORIZACIÓN O SISTEMA:", error.message);
    }
}

/**
 * 📅 SECCIÓN 2: GESTIÓN DE TURNOS Y CALENDARIO 
 * Flujo para que los usuarios consulten y reserven.
 */
async function gestionarTurnos(usuarioId: number, salaId: number, fecha: string) {
    console.log(`\n--- [USER] GESTIÓN DE CALENDARIO PARA EL ${fecha} ---`);

    try {
        // 1. Ver el estado del calendario 
        const turnosOcupados = await TurnoService.obtenerCalendario(salaId, fecha);
        console.log(`> Turnos existentes en esta fecha:`, turnosOcupados);

        // 2. Intentar una nueva reserva
        const horaInicio = "14:00";
        const horaFin = "16:00";

        console.log(`> Intentando reservar de ${horaInicio} a ${horaFin}...`);
        const reserva = await TurnoService.reservarTurno(usuarioId, salaId, fecha, horaInicio, horaFin);

        if (reserva.success) {
            console.log("✅ RESERVA CONFIRMADA:", reserva.data);
        } else {
            console.warn("🚫 RESERVA RECHAZADA:", reserva.message);
        }

    } catch (error: any) {
        console.error("❌ ERROR EN MÓDULO DE TURNOS:", error.message);
    }
}

/**
 * 🚀 EJECUCIÓN PRINCIPAL (Simulación de Caso de Uso Real)
 */
async function bootstrap() {
    console.log("=== SISTEMA DE GESTIÓN DE COWORKING - STARTUP ===");

    // ID del usuario que realiza las acciones (asumimos que existe en tu DB)
    const MI_USUARIO_ID = 1; 
    const ID_SALA_TEST = 5;
    const FECHA_TEST = "2026-04-10";

    // 1. Intentamos crear una sala (Si el ID 1 es admin, funcionará)
    await realizarAltaDeSala(MI_USUARIO_ID);

    // 2. Operamos el calendario y los turnos
    await gestionarTurnos(MI_USUARIO_ID, ID_SALA_TEST, FECHA_TEST);

    console.log("\n=== PROCESO FINALIZADO ===");
}

// Arrancamos el sistema
bootstrap();
