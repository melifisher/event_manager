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
