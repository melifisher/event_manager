const prisma = require('../config/db');

exports.findAll = async () => {
  return await prisma.room.findMany();
};

exports.findAvailable = async (start, end) => {
    const rooms = await prisma.room.findMany({
        where: {
          events: {
            none: {
              activo: true,
              OR: [
                {
                  AND: [
                    { start: { lte: start } },
                    { end: { gt: start } }
                  ]
                },
                {
                  AND: [
                    { start: { lt: end } },
                    { end: { gte: end } }
                  ]
                },
                {
                  AND: [
                    { start: { gte: start } },
                    { end: { lte: end } }
                  ]
                }
              ]
            }
          }
        }
    });
  
    return rooms;
}
