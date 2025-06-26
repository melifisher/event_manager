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
