const reportService = require('../services/reportService');

exports.getOccupancyReport = async (req, res) => {
    try {
        const { start, end } = req.query;
        const occupancyReport = await reportService.getOccupancyReport(new Date(start), new Date(end));
        
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