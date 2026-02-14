const { Pool } = require('pg');
require('dotenv').config();

// Create the pool using variables from .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL database successfully!'))
  .catch(err => console.error('Database connection error', err.stack));

// Helper function to execute queries
const query = (text, params) => {
  const start = Date.now();
  return pool.query(text, params)
    .then(res => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount });
      return res;
    });
}

module.exports = {
  query: query,
  connect: () => pool.connect(),
  pool: pool
};