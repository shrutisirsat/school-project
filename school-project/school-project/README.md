
# School Project (Next.js + MySQL)

Two pages:
- `addSchool` (form with validation + file upload)
- `showSchools` (grid like ecommerce)

## Quick Start (local dev)

1. Install **Node.js 18+** and **npm**.
2. Install **MySQL** (e.g., XAMPP or a hosted MySQL).
3. Create database `schooldb` (or any name you prefer).
4. Run the SQL in `schema.sql` to create the `schools` table.
5. Copy `.env.local.example` to `.env.local` and set your DB credentials.
6. Install deps & run:
   ```bash
   npm install
   npm run dev
   ```
7. Visit `http://localhost:3000`

> Note: On platforms like Vercel, writing to filesystem isn't persistent. For deployment, prefer using an image URL (the "OR Image URL" field) or use a storage like Cloudinary/S3.

## PlanetScale / Hosted DB (optional)

Set `DB_SSL=true` in `.env.local`. No other code change required.

## Deploy (Vercel)

1. Push this project to a public GitHub repo.
2. Import the repo on Vercel.
3. Add the same env vars (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL) in the Vercel project settings.
4. Deploy.

## API

- `POST /api/uploadSchool` — multipart form data with fields: `name, address, city, state, contact, email_id` and `image` (file) or `imageUrl` (string).
- `GET /api/schools` — returns list with `id, name, address, city, image`.
