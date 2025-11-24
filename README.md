# Node.js + Express + MongoDB Blog Application

A full-featured blog application with user authentication, profiles, and blog management using JWT tokens.

## Features

- User Registration & Login with JWT Authentication
- User Profile Management
- Blog CRUD Operations
- CORS Enabled
- Password Hashing with bcryptjs
- Protected Routes with Middleware
- Blog Likes & Views Tracking

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

5. Make sure MongoDB is running on your system

6. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile (Protected)

### Blogs
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (Protected)
- `PUT /api/blogs/:id` - Update blog (Protected)
- `DELETE /api/blogs/:id` - Delete blog (Protected)
- `GET /api/blogs/user/:userId` - Get user's blogs
- `PUT /api/blogs/:id/like` - Like/Unlike blog (Protected)

## Example API Usage

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Blog (Protected - requires JWT token)
```bash
POST /api/blogs
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "tags": ["nodejs", "express", "mongodb"],
  "published": true
}
```

## Project Structure

```
Node-MongoDB/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── userController.js  # User profile logic
│   └── blogController.js  # Blog CRUD logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User model
│   └── Blog.js            # Blog model
├── routes/
│   ├── auth.js            # Auth routes
│   ├── users.js           # User routes
│   └── blogs.js           # Blog routes
├── .env.example           # Environment variables example
├── .gitignore
├── package.json
├── README.md
└── server.js              # Main server file
```

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes with middleware
- Input validation
- CORS enabled for cross-origin requests

