# DevScribe

DevScribe is a full-stack blogging web application built using the MERN stack (MongoDB, Express, React, and Node.js). The application offers user authentication, protected routes, image uploads, post management, interactive commenting, and dynamic post filtering.

## Live Application & Repository Links

* **Frontend Web App:** https://devscribe-mern.vercel.app
* **Backend API Base URL:** https://abundant-grace-production-6eba.up.railway.app/api
* **GitHub Repository:** https://github.com/BSSE24040/devscribe-mern

---

## Features

* **User Authentication:** Registration and login functionality using JSON Web Tokens (JWT) with secure password hashing via bcrypt.
* **Image Management:** Support for uploading post cover images and user profile avatars hosted on Cloudinary.
* **Post Operations:** Author-restricted post creation, editing, deletion, and full reading capabilities.
* **Interactivity:** Post liking system and nested user comment sections.
* **Search & Tags:** Query posts dynamically by specific tags or search terms in post titles.
* **Profile Management:** Public user profiles displaying author statistics and private user dashboards for post administration.

---

## Technical Stack

### Frontend
* React 18 (Vite build tool)
* React Router v6
* Axios
* Modular CSS stylesheets

### Backend
* Node.js & Express framework
* MongoDB Atlas & Mongoose ODM
* JWT & bcryptjs for authentication
* Multer & Cloudinary SDK for image handling

### Infrastructure & Hosting
* Frontend: Vercel
* Backend: Railway
* Database: MongoDB Atlas

---

## Project Structure

```
devscribe-mern/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── models/
        ├── routes/
        ├── middlewares/
        ├── services/
        ├── app.js
        └── server.js
```

---

## API Endpoints Summary

Base Route: `/api`

### Authentication & Users
* `POST /auth/register` - Create a new user account
* `POST /auth/login` - Authenticate user and receive token
* `GET /auth/me` - Fetch current user profile (Private)
* `GET /users/:id` - Fetch public profile of a user
* `PUT /users/me` - Update personal profile details (Private)

### Posts
* `GET /posts` - List all posts (Supports `?tag=` and `?search=`)
* `GET /posts/:id` - Fetch detailed view of a post
* `POST /posts` - Create a new post (Private)
* `PUT /posts/:id` - Update an existing post (Private, Author only)
* `DELETE /posts/:id` - Delete a post (Private, Author only)
* `GET /posts/me/mine` - Fetch all posts authored by logged-in user (Private)
* `PUT /posts/:id/like` - Toggle like on a post (Private)

### Comments
* `GET /comments/:postId` - Fetch comments for a specific post
* `POST /comments/:postId` - Create a new comment (Private)
* `DELETE /comments/:id` - Delete a comment (Private, Author only)

*Note: Private endpoints require an `Authorization: Bearer <token>` header.*

---

## Local Development Setup

### Prerequisites
* Node.js (v18 or higher)
* MongoDB database instance / Atlas connection string
* Cloudinary API credentials

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/BSSE24040/devscribe-mern.git
   cd devscribe-mern
   ```

2. Configure and run the Backend:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside the `backend/` directory with the following keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

3. Configure and run the Frontend:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file inside the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the application client:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## License

This project is open source and available under the MIT License.

---

## Author

**Mahad Ashfaq**
* GitHub: https://github.com/BSSE24040
* LinkedIn: https://www.linkedin.com/in/muhammadmahadashfaq
