// middlewares/reportMiddleware.js
const fs = require('fs');

const reportMiddleware = (req, res, next) => {
    const log = `Ruta consultada: ${req.originalUrl} - ${new Date().toISOString()}\n`;
    fs.appendFile('report.log', log, (err) => {
        if (err) console.error('Error al guardar el reporte', err);
    });
    next();
};

module.exports = reportMiddleware;
