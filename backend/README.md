# DevScribe — Backend

Express + MongoDB REST API for the DevScribe blogging platform.

## Tech Stack
- Node.js / Express
- MongoDB + Mongoose
- JWT authentication (jsonwebtoken + bcryptjs)
- Cloudinary (image uploads via multer, in-memory storage → stream to Cloudinary)

## Folder Structure
```
src/
  config/        MongoDB + Cloudinary connection setup
  controllers/   Request/response handlers (business logic entry points)
  models/        Mongoose schemas (User, Post, Comment)
  routes/        Express route definitions
  middlewares/   authMiddleware (JWT), uploadMiddleware (multer), errorHandler
  services/      cloudinaryService (reusable upload/delete logic)
  app.js         Express app (middleware + route mounting)
  server.js      Entry point (connects DB, starts server)
```

## Local Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your real values:
   ```bash
   cp .env.example .env
   ```

   | Variable | Where to get it |
   |---|---|
   | `MONGO_URI` | MongoDB Atlas → Database → Connect → Drivers |
   | `JWT_SECRET` | Any long random string (e.g. generate with `openssl rand -hex 32`) |
   | `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → top of the page |
   | `CLIENT_URL` | `http://localhost:5173` for local dev |

3. Run in development mode (auto-restarts on changes):
   ```bash
   npm run dev
   ```

4. Confirm it's alive: open `http://localhost:5000/api/health` — you should see `{ "status": "ok" }`.

## Deployment (Render)

1. Push this project to GitHub.
2. On [render.com](https://render.com) → **New +** → **Web Service** → connect your repo.
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free is fine to start
4. Add all the variables from `.env` under **Environment** (same keys, real values). Set `CLIENT_URL` to your deployed Vercel frontend URL once you have it (comma-separate multiple origins if needed).
5. Deploy. Render gives you a URL like `https://devscribe-backend.onrender.com` — that's your `VITE_API_URL` base for the frontend (append `/api`).

**Note:** Render's free tier spins down after inactivity, so the first request after idling can take ~30-50 seconds to wake up. This is normal.
