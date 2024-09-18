const { db } = require('../db/config');
const format = require('pg-format');
const { handleGenerateHATEOAS } = require('../helpers/helpers');

const fetch = async (limit = 3, orderBy = 'precio ASC', page = 1, filters = {}) => {
    try {
        const SQLresquest = "SELECT * FROM inventario limit $1"
        const SQLvalues = [limit]

        const { rows: inventario} = await db.query(SQLresquest, SQLvalues)

        return inventario

    } catch (error) {
        throw error
    }
};

module.exports = {
    fetch
};