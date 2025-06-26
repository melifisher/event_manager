const reportRepository = require('../repositories/reportRepository');

exports.getOccupancyReport = async (start, end) => {
    if (start && end && end <= start) {
        throw new Error('La fecha de fin debe ser mayor a la fecha de inicio');
    }
  
      const reportData = await reportRepository.getOccupancyReport(start, end);
      
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