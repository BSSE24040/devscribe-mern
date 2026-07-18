# 📝 DevScribe

**A full-stack blogging platform for developers — write, share, and discuss what you build.**

DevScribe is a production-shaped MERN application built to demonstrate a complete real-world feature set: JWT authentication, protected routes, image uploads via Cloudinary, full CRUD, and a clean, layered architecture on both ends of the stack.

<!-- Add badges once deployed, e.g.:
[![Frontend](https://img.shields.io/badge/frontend-vercel-black)](https://your-app.vercel.app)
[![Backend](https://img.shields.io/badge/backend-render-46E3B7)](https://your-api.onrender.com)
-->

**🔗 Live Demo:** _(add link once deployed)_
**🔗 API Base URL:** _(add link once deployed)_

---


## ✨ Features

| | |
|---|---|
| 🔐 **Authentication** | Register/login with JWT, passwords hashed with bcrypt |
| 🖼️ **Image Uploads** | Post cover images and user avatars, stored on Cloudinary |
| ✍️ **Full CRUD on Posts** | Create, read, update, delete — author-only edit/delete |
| 💬 **Comments** | Add and delete comments on any post |
| ❤️ **Likes** | Toggle like/unlike on posts |
| 🏷️ **Tags & Search** | Filter posts by tag, search by title |
| 👤 **Profiles** | Public author profiles + a private "My Posts" dashboard |
| 🛡️ **Protected Routes** | Client and server both guard private actions |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 (Vite)
- React Router v6
- Axios
- Plain CSS — no framework, one stylesheet per component/page

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`) + `bcryptjs`
- Cloudinary + Multer (in-memory buffer → streamed upload, no temp files on disk)

**Deployment**
- Frontend → [Vercel](https://vercel.com)
- Backend → [Render](https://render.com)
- Database → [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🏗️ Architecture

```
DevScribe/
├── frontend/                React app
│   ├── public/               Static assets served as-is
│   └── src/
│       ├── assets/            Images/icons imported in code
│       ├── components/        Reusable UI: Navbar, Footer, PostCard,
│       │                      CommentSection, AuthContext, ProtectedRoute, Loader
│       ├── pages/              Route-level screens (Home, Login, Dashboard, ...)
│       ├── utils/               api.js (axios instance), validators.js
│       ├── styles/               One .css file per page/component
│       ├── App.jsx                 Route definitions
│       └── main.jsx                 React DOM entry point
│
└── backend/                 Express API
    └── src/
        ├── config/            DB + Cloudinary connection setup
        ├── controllers/         Request/response handlers
        ├── models/               Mongoose schemas: User, Post, Comment
        ├── routes/                 Express route definitions
        ├── middlewares/              authMiddleware, uploadMiddleware, errorHandler
        ├── services/                   cloudinaryService (upload/delete logic)
        ├── app.js                       Express app + middleware/route mounting
        └── server.js                      Entry point — connects DB, starts server
```

The backend follows a **routes → controllers → models/services** flow: routes only wire up HTTP verbs to handlers, controllers hold the request logic, and reusable side-effects (like Cloudinary uploads) live in `services/` so they're not duplicated across controllers.

---

## 📡 API Reference

Base URL: `/api`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Create an account |
| `POST` | `/auth/login` | Public | Log in, receive a JWT |
| `GET` | `/auth/me` | Private | Get the logged-in user |
| `GET` | `/users/:id` | Public | View a user's profile |
| `PUT` | `/users/me` | Private | Update profile (name, bio, avatar) |
| `GET` | `/posts` | Public | List posts — supports `?tag=` and `?search=` |
| `GET` | `/posts/:id` | Public | Get a single post |
| `POST` | `/posts` | Private | Create a post (with cover image) |
| `PUT` | `/posts/:id` | Private | Update a post (author only) |
| `DELETE` | `/posts/:id` | Private | Delete a post (author only) |
| `GET` | `/posts/me/mine` | Private | List the logged-in user's posts |
| `PUT` | `/posts/:id/like` | Private | Toggle like on a post |
| `GET` | `/comments/:postId` | Public | List comments on a post |
| `POST` | `/comments/:postId` | Private | Add a comment |
| `DELETE` | `/comments/:id` | Private | Delete a comment (author only) |

Private routes require an `Authorization: Bearer <token>` header.

---

## 🚀 Getting Started Locally

**Prerequisites:** Node.js 18+, a MongoDB Atlas connection string, and a Cloudinary account.

```bash
git clone https://github.com/YOUR_USERNAME/devscribe.git
cd devscribe
```

**Backend**
```bash
cd backend
npm install

npm run dev
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. Full setup and environment variable details are documented in [`backend/README.md`](./backend/README.md) and [`frontend/README.md`](./frontend/README.md).

---

## ☁️ Deployment

1. Deploy `backend/` to **Render** first, note its live URL.
2. Deploy `frontend/` to **Vercel**, setting `VITE_API_URL` to the Render URL.
3. Update `CLIENT_URL` on Render to the Vercel URL (required for CORS).

Full step-by-step instructions are in each folder's README.

---

## 🗺️ Roadmap / Possible Extensions

- [ ] Rich text / Markdown editor for post content
- [ ] Pagination or infinite scroll on the home feed
- [ ] Email verification on signup
- [ ] Following authors / a personalized feed
- [ ] Draft vs. published post states

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

## 👤 Author

Built by **[Your Name]** — [GitHub](https://github.com/YOUR_USERNAME) · [LinkedIn](https://linkedin.com/in/YOUR_USERNAME)
