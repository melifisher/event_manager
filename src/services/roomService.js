const roomRepository = require('../repositories/roomRepository');

exports.getAllRooms = async () => {
  return await roomRepository.findAll();
};

exports.getAvailableRooms = async (start, end) => {
    if (!start || !end) {
        throw new Error('Las fechas de inicio y fin son requeridas');
    }
  
    if (end <= start) {
        throw new Error('La fecha de fin debe ser mayor a la fecha de inicio');
    }

  return await roomRepository.findAvailable(start, end);
}
