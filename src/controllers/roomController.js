const roomService = require('../services/roomService');

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    next(error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las salas',
      error: error.message
    });
  }
};

exports.getAvailableRooms = async (req, res) => {
    try {
        const { start, end } = req.query;
        const availableRooms = await roomService.getAvailableRooms(new Date(start), new Date(end));
        
        res.json({
            success: true,
            message: 'Salas disponibles obtenidas exitosamente',
            data: availableRooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las salas disponibles',
            error: error.message
        });
    }
}
