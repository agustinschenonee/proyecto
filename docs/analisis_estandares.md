**TABLA COMPARATIVA DE ESTÁNDARES**

| Estándar | Año (aprox.) | Enfoque principal | ¿Aplica al proyecto? | Justificación |
| :--- | :--- | :--- | :--- | :--- |
| **ISO 9241-11** | 1998 (Rev. 2018) | Usabilidad: Eficacia, eficiencia y satisfacción. | **SÍ** | Fundamental para que los usuarios sientan comodidad al usar el sistema y reserven sin errores. |
| **ISO 13407** | 1999 (Sust. 9241-210) | Diseño centrado en el humano (prototipado). | **SÍ** | Para tener una interfaz intuitiva y accesible, reflejar la ocupación de salas y el entendimiento de los usuarios. |
| **ISO/IEC 27001** | 2022 | Gestión de seguridad (Confidencialidad). | **NO (Temporalmente)** | Actualmente el sistema no posee datos criticos, pero es muy importante para el manejo de datos personales y la futura integración de métodos de pago y datos bancarios para el abono de reservas. |
| **ISA/IEC 62443** | 2010+ | Ciberseguridad industrial (OT). | **NO** | Es un sistema web de gestión, no controla maquinaria industrial. |
| **ISO 9001** | 2015 | Gestión de Calidad y mejora continua. | **SÍ** | Asegura que el desarrollo cumpla con los requisitos del cliente. |

**Conclusión**

Si tuviéramos que certificar DEVpapois, elegiríamos la **ISO 13407** porque nuestro objetivo central es la *facilidad de uso para cualquier persona*. Certificarnos implicaría cambios en nuestra arquitectura para incluir capas de **observabilidad**, permitiendo monitorear si los usuarios se confunden al usar el calendario o si logran reservar sin errores. También nos obligaría a formalizar etapas de testeo con usuarios reales antes de definir código, asegurando que las salas creadas por Factory cumplan con las expectativas de los clientes.


**Patrones de Diseño (observaciones con respecto a los estándares)**

El patrón **Factory** ayuda al cumplimiento de la ISO 9001. Al centralizar la creación de recursos (salas, escritorios) en una única clase, garantizamos que todos los objetos cumplan con estándares de calidad uniformes, facilitando auditorías de código y minimizando defectos en la instanciación.
Las validaciones de seguridad implementadas ayudan a la ISO 27001, asegurando que la integridad de los datos de reserva no sea vulnerada por usuarios sin permisos
