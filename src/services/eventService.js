const eventRepository = require('../repositories/eventRepository');

exports.getAllEvents = async () => {
  return await eventRepository.findAll();
};

exports.createEvent = async (name, start, end, roomId) => {
    if (!name || name.trim().length === 0) {
        throw new Error('El nombre del evento es requerido');
    }
    if (!start || !end) {
        throw new Error('Las fechas de inicio y fin son requeridas');
    }
    if (end <= start) {
        throw new Error('La fecha de fin debe ser mayor a la fecha de inicio');
    }
    if (!roomId) {
        throw new Error('El ID de la habitación es requerido');
    }
  return await eventRepository.create(
    name,
    start,
    end,
    roomId
  );
}

exports.cancelEvent = async (name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('El nombre del evento es requerido');
  }
  return await eventRepository.cancelByName(name.trim());
};

exports.getAvailableRooms = async (start, end) => {
    if (!start || !end) {
        throw new Error('Las fechas de inicio y fin son requeridas');
    }
  
    if (end <= start) {
        throw new Error('La fecha de fin debe ser mayor a la fecha de inicio');
    }

  return await eventRepository.findAvailable(start, end);
}

exports.getOccupancyReport = async (start, end) => {
    if (start && end && end <= start) {
        throw new Error('La fecha de fin debe ser mayor a la fecha de inicio');
    }
  
      const reportData = await eventRepository.getOccupancyReport(start, end);
      
      const periodHours = start && end 
        ? calculateDuration(start, end)
        : 24 * 365;
  
      return reportData.map(room => {
        const totalHours = room.events.reduce((sum, event) => sum + event.duration, 0);
        
        return {
          roomId: room.roomId,
          roomName: room.roomName,
          totalEvents: room.totalEvents,
          totalHours: Math.round(totalHours * 100) / 100,
          occupancyPercentage: calculateOccupancyPercentage(totalHours, periodHours),
          events: room.events
        };
      });
};

const calculateOccupancyPercentage = (totalHours, periodHours) => {
  if (periodHours === 0) return 0;
  return Math.round((totalHours / periodHours) * 10000) / 100;
}

const calculateDuration = (start, end) => {
  const durationInMs = end - start;
  return Math.round(durationInMs / (1000 * 60 * 60));
}