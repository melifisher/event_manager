const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/occupancy', reportController.getOccupancyReport);

module.exports = router;