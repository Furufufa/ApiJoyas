const express = require('express');
const app = express();
const joyasRoutes = require('./routes/joyas');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/', joyasRoutes);

module.exports = app;
