const prisma = require('../config/db');

exports.findAll = async () => {
  return await prisma.event.findMany();
};

exports.create = async (name, start, end, roomId) => {
  // Verificar si la habitación existe
  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) {
    throw new Error('La habitación especificada no existe');
  }

  // Verificar conflictos de horario
  const conflictingEvents = await prisma.event.findMany({
    where: {
      roomId: roomId,
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
  });

  if (conflictingEvents.length > 0) {
    throw new Error('Ya existe un evento en ese horario para la habitación seleccionada');
  }

  const event = await prisma.event.create({
    data: {
      name, start, end, roomId,
      activo: true
    },
    include: {
      room: true
    }
  });

  return event;
}

exports.cancelByName = async (name) => {
  const event = await prisma.event.findFirst({
    where: {
      name: name,
      activo: true
    },
    include: {
      room: true
    }
  });

  if (!event) {
    throw new Error(`No se encontró un evento activo con ese nombre: ${name}`);
  }

  const updatedEvent = await prisma.event.update({
    where: { id: event.id },
    data: { activo: false },
    include: {
      room: true
    }
  });

  return updatedEvent;
}