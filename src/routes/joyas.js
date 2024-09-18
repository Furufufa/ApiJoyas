const express = require('express');
const router = express.Router();
const { obtenerJoyas, obtenerJoyasPorFiltros } = require('../controllers/joyasControllers');
const reportMiddleware = require('../middleware.js/reportMiddleware');

router.use(reportMiddleware);


router.get('/joyas', obtenerJoyas);


router.get('/joyas/filtros', obtenerJoyasPorFiltros);

module.exports = router;
