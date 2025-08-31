
import mysql from 'mysql2/promise';

let pool;

export async function getPool() {
  if (!pool) {
    const baseConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'schooldb',
      connectionLimit: 10,
    };

    // Optional SSL for hosted providers like PlanetScale
    if (process.env.DB_SSL === 'true') {
      baseConfig.ssl = { rejectUnauthorized: true };
    }

    pool = mysql.createPool(baseConfig);
  }
  return pool;
}
