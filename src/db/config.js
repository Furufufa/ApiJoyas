//-- Active: 1726463081353@@127.0.0.1@5432@joyas
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'joyas',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
    allowExitOnIdle: true
});

const createTables = async () => {
    await pool.query(
        `
       CREATE TABLE IF NOT EXISTS inventario 
       (id SERIAL, nombre VARCHAR(50), 
       categoria VARCHAR(50), 
       metal VARCHAR(50), 
       precio INT, stock INT);
        `
    )
};

const insertarData = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM inventario');
    const count = parseInt(result.rows[0].count, 10);
  
    if (count === 0) { await pool.query(
        `
        INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES
        ('Collar Heart', 'collar', 'oro', 20000, 2),
        ('Collar History', 'collar', 'plata', 15000, 5),
        ('Aros Berry', 'aros', 'oro', 12000, 10),
        ('Aros Hook Blue', 'aros', 'oro', 25000, 4),
        ('Anillo Wish', 'aros', 'plata', 30000, 4),
        ('Anillo Cuarzo Greece', 'anillo', 'oro', 40000, 2);
        `
      );
    }
  };

  const initDB = async () => {
    console.log('Crear tablas si estas no existen')
    await createTables()
    await insertarData()
  };

module.exports = {pool, initDB};