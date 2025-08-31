
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getPool } from '../../../lib/db';

export const config = {
  api: { bodyParser: false },
};

const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname || '');
    const base = path.basename(file.originalname || 'image', ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({ storage });

const handler = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  const { name, address, city, state, contact, email_id, imageUrl } = req.body;
  if (!name || !address || !city || !state || !email_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const relPath = req.file ? `/schoolImages/${req.file.filename}` : (imageUrl || '');

  const pool = await getPool();
  await pool.execute(
    'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, address, city, state, contact || null, relPath, email_id]
  );

  res.status(200).json({ message: 'School added successfully' });
});

export default handler;
