# 📝 DevScribe

**A full-stack blogging platform for developers — write, share, and discuss what you build.**

DevScribe is a production-ready MERN application built to demonstrate a complete real-world feature set: JWT authentication, protected routes, image uploads via Cloudinary, full CRUD operations, and a clean, layered architecture on both ends of the stack.

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)](https://devscribe-mern.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Railway-purple?style=flat&logo=railway)](https://abundant-grace-production-6eba.up.railway.app)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**🔗 Live Web App:** [https://devscribe-mern.vercel.app](https://devscribe-mern.vercel.app)  
**🔗 API Base URL:** `https://abundant-grace-production-6eba.up.railway.app/api`  
**🔗 GitHub Repository:** [BSSE24040/devscribe-mern](https://github.com/BSSE24040/devscribe-mern)

---

## ✨ Features

| Category | Feature Highlights |
|---|---|
| 🔐 **Authentication** | Register and login with JWT, passwords securely hashed using `bcrypt` |
| 🖼️ **Image Uploads** | Post cover images and user avatars via Cloudinary |
| ✍️ **Full CRUD on Posts** | Create, read, update, and delete posts (author-only authorization) |
| 💬 **Comments** | Real-time post discussions with comment creation and deletion |
| ❤️ **Likes** | Toggle like/unlike status on posts |
| 🏷️ **Tags & Search** | Dynamically filter posts by tags or search titles |
| 👤 **Profiles** | Public author profile pages and a personal dashboard for managing posts |
| 🛡️ **Protected Routes** | Client-side route protection coupled with server-side middleware guards |

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** React 18 (built with Vite)
* **Routing:** React Router v6
* **HTTP Client:** Axios
* **Styling:** Plain CSS (Modular component stylesheets)

### **Backend**
* **Runtime & Framework:** Node.js + Express
* **Database & ODM:** MongoDB Atlas + Mongoose
* **Authentication:** JSON Web Tokens (`jsonwebtoken`) + `bcryptjs`
* **File Processing:** Cloudinary + Multer (In-memory buffer with streamed uploads)

### **Deployment & Infrastructure**
* **Frontend Hosting:** [Vercel](https://vercel.com)
* **Backend Hosting:** [Railway](https://railway.app)
* **Database Hosting:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🏗️ Architecture

```text
devscribe-mern/
├── frontend/                React Client Application
│   ├── public/               Static public assets
│   └── src/
│       ├── assets/            Images/icons
│       ├── components/        Reusable UI (Navbar, Footer, PostCard, CommentSection, AuthContext, ProtectedRoute, Loader)
│       ├── pages/              Route views (Home, Login, Dashboard, PostDetail, Profile)
│       ├── utils/               api.js (Axios base instance), validators.js
│       ├── styles/               CSS files per component/page
│       ├── App.jsx                 Route configurations
│       └── main.jsx                 Entry point
│
└── backend/                 Express REST API
    └── src/
        ├── config/            Database & Cloudinary client configurations
        ├── controllers/         Route handling logic
        ├── models/               Mongoose Schemas (User, Post, Comment)
        ├── routes/                 Express routes
        ├── middlewares/              Auth, Multer upload, and Error Handling middlewares
        ├── services/                   Cloudinary upload/delete services
        ├── app.js                       Express application setup & CORS configuration
        └── server.js                      Entry point — DB initialization & server bootstrap
```

---

## 📡 API Reference

**Base URL:** `https://abundant-grace-production-6eba.up.railway.app/api`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register a new user account |
| `POST` | `/auth/login` | Public | Authenticate user and receive a JWT |
| `GET` | `/auth/me` | Private | Retrieve details of the authenticated user |
| `GET` | `/users/:id` | Public | View a user's public profile |
| `PUT` | `/users/me` | Private | Update profile details (Name, bio, avatar) |
| `GET` | `/posts` | Public | Fetch all posts (Supports `?tag=` and `?search=`) |
| `GET` | `/posts/:id` | Public | Fetch details for a specific post |
| `POST` | `/posts` | Private | Create a post (Supports cover image upload) |
| `PUT` | `/posts/:id` | Private | Update an existing post (Author only) |
| `DELETE` | `/posts/:id` | Private | Delete a post (Author only) |
| `GET` | `/posts/me/mine` | Private | Fetch posts created by the logged-in user |
| `PUT` | `/posts/:id/like` | Private | Toggle like status on a post |
| `GET` | `/comments/:postId` | Public | Fetch comments for a specific post |
| `POST` | `/comments/:postId` | Private | Add a comment to a post |
| `DELETE` | `/comments/:id` | Private | Delete a comment (Author only) |

*Note: Private routes require an `Authorization: Bearer <token>` header.*

---

## 🚀 Local Development Setup

### **Prerequisites**
* Node.js (v18+)
* MongoDB Atlas cluster URI
* Cloudinary account credentials

### **Clone Repository**
```bash
git clone https://github.com/BSSE24040/devscribe-mern.git
cd devscribe-mern
```

### **1. Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend development server:
```bash
npm run dev
```

### **2. Setup Frontend**
Open a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

---

## ☁️ Deployment Environment Variables

### **Railway (Backend)**
* `MONGO_URI`: MongoDB Atlas connection string.
* `JWT_SECRET`: Secret key for JWT signing.
* `CLIENT_URL`: `https://devscribe-mern.vercel.app`
* `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name.
* `CLOUDINARY_API_KEY`: Cloudinary API key.
* `CLOUDINARY_API_SECRET`: Cloudinary API secret.

### **Vercel (Frontend)**
* `VITE_API_URL`: `https://abundant-grace-production-6eba.up.railway.app/api`

---

## 🗺️ Roadmap & Future Enhancements

- [ ] Rich text / Markdown editor for post creation
- [ ] Pagination & infinite scroll for the home feed
- [ ] Email verification on account signup
- [ ] Author follow system & personalized feed
- [ ] Drafts vs. Published states for posts

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

## 👤 Author

**Mahad Ashfaq**

* **GitHub:** [@BSSE24040](https://github.com/BSSE24040)
* **LinkedIn:** [Muhammad Mahad Ashfaq](https://www.linkedin.com/in/muhammadmahadashfaq)
