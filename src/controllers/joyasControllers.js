const { pool } = require('../db/config');
const format = require('pg-format');
const { handleGenerateHATEOAS } = require('../helpers/helpers');

const obtenerJoyas = async (req, res) => {
    try {        
        const { limit = 3, order_by = 'precio_ASC', page = 1 } = req.query;
        
        const validPage = Math.max(parseInt(page, 10), 1);
        const validLimit = Math.max(parseInt(limit, 10), 1);
        
        const [campo, direccion] = order_by.split("_");
        const offset = (validPage - 1) * validLimit;
        
        const formattedQuery = format(
            'SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L',
            campo, direccion, validLimit, offset
        );
        
        const { rows: joyas } = await pool.query(formattedQuery);
       
        const totalItemsQuery = await pool.query('SELECT COUNT(*) FROM inventario');
        const totalItems = parseInt(totalItemsQuery.rows[0].count, 10);
        
        const stockTotal = joyas.reduce((total, joya) => total + joya.stock, 0);
        
        const results = joyas.map(joya => ({
            name: joya.nombre,
            href: `/joyas/joya/${joya.id}`
        }));

        res.json({
            totalJoyas: joyas.length,
            stockTotal: stockTotal,
            results: results
        });

    } catch (error) {
        console.error('Error al obtener las joyas:', error);
        res.status(500).json({ error: 'Error al obtener las joyas' });
    }
};


const obtenerJoyasPorFiltros = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;

        let filters = [];
        let queryParams = [];
        let paramCounter = 1;

        // Filtros para el query
        if (precio_max) {
            filters.push(`precio <= $${paramCounter}`);
            queryParams.push(precio_max);
            paramCounter++;
        }
        if (precio_min) {
            filters.push(`precio >= $${paramCounter}`);
            queryParams.push(precio_min);
            paramCounter++;
        }
        if (categoria) {
            filters.push(`categoria = $${paramCounter}`);
            queryParams.push(categoria);
            paramCounter++;
        }
        if (metal) {
            filters.push(`metal = $${paramCounter}`);
            queryParams.push(metal);
            paramCounter++;
        }

        // Construir la consulta
        const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
        const query = `SELECT * FROM inventario ${whereClause}`;

        // Ejecutar la consulta
        const { rows: joyasFiltradas } = await pool.query(query, queryParams);
        
        res.status(200).json(joyasFiltradas);
    } catch (error) {
        console.error('Error al filtrar las joyas:', error);
        res.status(500).json({ message: 'Error al filtrar las joyas' });
    }
};


module.exports = {
    obtenerJoyas,
    obtenerJoyasPorFiltros,
};

