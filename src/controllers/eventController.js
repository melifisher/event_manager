const eventService = require('../services/eventService');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los eventos',
      error: error.message
    });
  }
};

exports.createEvent = async (req, res) => {
    try {
      const { name, start, end, roomId } = req.body;
      console.log('Crear evento, data:', req.body);
      const event = await eventService.createEvent(
        name, 
        new Date(start),
        new Date(end),
        roomId
      );
      
      res.status(201).json({
        success: true,
        message: 'Evento creado exitosamente',
        data: event
      });
    } catch (error) {
    //   next(error);
      res.status(500).json({
        success: false,
        message: 'Error al crear el evento',
        error: error.message
      });
    }
};

exports.cancelEvent = async (req, res) => {
  try {
    const { name } = req.body;
      
    const event = await eventService.cancelEvent(name);
    
    res.json({
        success: true,
        message: 'Evento cancelado exitosamente',
        data: event
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Error al cancelar el evento',
        error: error.message
    });
  }
}

exports.getAvailableRooms = async (req, res) => {
    try {
        const { start, end } = req.query;
        const availableRooms = await eventService.getAvailableRooms(new Date(start), new Date(end));
        
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

exports.getOccupancyReport = async (req, res) => {
    try {
        const { start, end } = req.query;
        const occupancyReport = await eventService.getOccupancyReport(new Date(start), new Date(end));
        
        res.json({
            success: true,
            message: 'Reporte de ocupación obtenido exitosamente',
            data: occupancyReport,
            period: {
              startDate: start,
              endDate: end
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el reporte de ocupación',
            error: error.message
        });
    }
}