const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const rooms = ['Room 1', 'Room 2', 'Room 3'];

  for (const name of rooms) {
    await prisma.room.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Salas creadas exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
