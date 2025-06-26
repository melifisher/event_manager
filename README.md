# 🧠 API Event Manager

Este proyecto es una API REST modular, extensible y preparada para escalar. Usa **Express.js** como framework web, **Prisma** como ORM para acceder a una base de datos **PostgreSQL**, y sigue una arquitectura limpia y desacoplada.

---

## 🧱 Decisiones de diseño
- Prisma ORM: Se eligió Prisma por su facilidad de uso, soporte para migraciones, y tipado automático que mejora la productividad.
- Arquitectura por capas: Se separó la lógica en controladores, servicios y repositorios para favorecer el desacoplamiento y facilitar futuras pruebas unitarias.
- Versionamiento: La API está versionada desde el inicio (/api/v1) para facilitar futuras migraciones sin romper la compatibilidad.
- Escalabilidad: La estructura permite añadir nuevos módulos de forma sencilla sin afectar el código existente.
- Express: Se eligió Express por su simplicidad y gran adopción en la comunidad.

## ⚙️ Instalación

Copiar en Bash
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
```

Inicia el servidor:
```
npm run dev
```
