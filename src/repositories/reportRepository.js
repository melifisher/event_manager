const prisma = require('../config/db');

exports.getOccupancyReport = async (start, end) => {
    const whereClause = {
        activo: true
    };
  
    if (start && end) {
      whereClause.AND = [
        { start: { gte: start } },
        { end: { lte: end } }
      ];
    }
    console.log('whereClause', whereClause);

    const rooms = await prisma.room.findMany({
        include: {
          events: {
            where: whereClause,
            orderBy: { start: 'asc' }
          }
        }
    });
  
    return rooms.map(room => ({
        roomId: room.id,
        roomName: room.name,
        totalEvents: room.events.length,
        events: room.events.map(event => ({
          id: event.id,
          name: event.name,
          email: event.email,
          start: event.start,
          end: event.end,
          duration: (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)
        }))
    }));
}