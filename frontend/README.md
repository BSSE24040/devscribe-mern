# DevScribe — Frontend

React (Vite) client for the DevScribe blogging platform. Plain CSS, no Tailwind — one stylesheet per page/component in `src/styles`.

## Tech Stack
- React 18 + Vite
- React Router v6
- Axios (with a request interceptor that attaches the JWT automatically)

## Folder Structure
```
src/
  assets/       Images/icons imported directly into components
  components/   Reusable UI: Navbar, Footer, PostCard, CommentSection,
                AuthContext (global auth state), ProtectedRoute, Loader
  pages/        Route-level screens: Home, Login, Register, PostDetail,
                CreatePost, EditPost, Profile, Dashboard, NotFound
  utils/        api.js (axios instance), validators.js (helpers)
  styles/       One .css file per page/component + global.css + variables.css
  App.jsx       Route definitions
  main.jsx      Renders App to the DOM
```

## Local Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Check `.env` — it already points at your local backend:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`. Make sure the backend is running too (see backend README).

## Deployment (Vercel)

1. Push this project to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add an environment variable:
   - `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`
5. Deploy. Vercel gives you a URL like `https://devscribe.vercel.app`.
6. Go back to your Render backend's environment variables and set `CLIENT_URL` to this Vercel URL, then redeploy the backend so CORS allows requests from it.

`vercel.json` in this folder already handles client-side routing (so refreshing `/posts/123` doesn't 404).
