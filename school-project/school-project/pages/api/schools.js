
import { getPool } from '../../../lib/db';

export default async function handler(req, res) {
  const pool = await getPool();
  if (req.method === 'GET') {
    const [rows] = await pool.query('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
    res.status(200).json(rows);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
