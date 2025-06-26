const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use(errorHandler);

module.exports = app;