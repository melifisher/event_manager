# 🧠 API Event Manager

Este proyecto es una API REST modular, extensible y preparada para escalar. Usa **Express.js** como framework web, **Prisma** como ORM para acceder a una base de datos **PostgreSQL**, y sigue una arquitectura limpia y desacoplada.

---

## 🧱 Decisiones de diseño
- Node.js: Se eligió Node.js por su alto rendimiento en aplicaciones I/O intensivas y su ecosistema maduro para construir APIs modernas. Su modelo asíncrono y basado en eventos lo hace ideal para gestionar múltiples solicitudes concurrentes.
- API REST: La solución se implementó como una API porque permite separar claramente la lógica de negocio de la interfaz de usuario, lo cual facilita futuras integraciones con sistemas web, móviles o incluso otros servicios internos.
- Prisma ORM: Se eligió Prisma por su facilidad de uso, soporte para migraciones, y tipado automático que mejora la productividad.
- Arquitectura por capas: Se separó la lógica en controladores, servicios y repositorios para favorecer el desacoplamiento y facilitar futuras pruebas unitarias.
- Versionamiento: La API está versionada desde el inicio (/api/v1) para facilitar futuras migraciones sin romper la compatibilidad.
- Express: Se eligió Express por su simplicidad y gran adopción en la comunidad.

## ⚙️ Instalación

Clonar repositorio:
```
git clone https://github.com/melifisher/event_manager.git
cd event_manager
npm install
```

Configura tu archivo .env:
```
DATABASE_URL="postgresql://usuario:password@localhost:5432/dbname"
PORT=3000
```

Crea la base de datos e inicializa Prisma:
```
npx prisma migrate dev --name init
npm run seed
```

Inicia el servidor:
```
npm run dev
```

## 📌 Rutas disponibles
- `GET /api/v1/events`
   Lista todos los eventos

- `POST /api/v1/events`  
  Crea un nuevo evento.  
  **Body JSON:**
  ```json
  {
    "name": "Event A",
    "start": "2025-06-24T09:00:00Z",
    "end": "2025-06-24T11:00:00Z",
    "roomId": 1
  }
  ```

- `POST /api/v1/events/cancel`
  Cancela un evento existente por su nombre.
  **Body JSON:**
  ```json
  {
    "name": "Event B"
  }
  ```
- `GET /api/v1/rooms/available?start=2025-06-24T14:00:00Z&end=2025-06-24T16:00:00Z`
  Devuelve las salas disponibles entre el rango de fechas y horas especificado.

- `GET /api/v1/reports/occupancy?start=2025-06-24&end=2025-06-25`
  Reporte de ocupación de salas entre las fechas indicadas.
