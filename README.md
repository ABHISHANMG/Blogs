# Node.js + Express + MongoDB Blog Application

A full-featured blog application with user authentication, profiles, and blog management using JWT tokens.

## Features

### Authentication & User Management
-  User Registration & Login with JWT Authentication
-  User Profile Management (bio, avatar, website)
-  Password Change Functionality
-  Password Hashing with bcryptjs
-  Protected Routes with Middleware
-  Role-based Access Control (User/Admin)

### Blog Features
-  Blog CRUD Operations
-  Blog Categories (Technology, Lifestyle, Travel, Food, Health, Education, Business, Other)
-  Featured Blogs
-  Blog Slugs for SEO-friendly URLs
-  Blog Excerpts (auto-generated)
-  Blog Likes & Views Tracking
-  Search Blogs (by title or content)
-  Filter Blogs (by category, tag, author, featured)
-  Pagination Support
-  Sort Blogs (by date, views, likes)

### Comments System
-  Add Comments to Blogs
-  Nested/Reply Comments (threaded comments)
-  Like Comments
-  Edit/Delete Comments (owner or admin only)

### Additional Features
-  CORS Enabled (with explicit URL whitelist)
-  Error Handling Middleware
-  Input Validation
-  MongoDB Connection with Error Handling

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
PORT=8000
MONGODB_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration - Comma-separated list of allowed origins
# Examples:
# ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://yourdomain.com
# If not set, defaults to: http://localhost:3000,http://localhost:3001,http://localhost:5173
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5173
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
- `PUT /api/auth/change-password` - Change password (Protected)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile (Protected)

### Blogs
- `GET /api/blogs` - Get all published blogs (with search, filter, pagination)
  - Query params: `search`, `category`, `tag`, `author`, `featured`, `page`, `limit`, `sort`
- `GET /api/blogs/featured` - Get featured blogs
- `GET /api/blogs/:id` - Get single blog (by ID or slug)
- `POST /api/blogs` - Create new blog (Protected)
- `PUT /api/blogs/:id` - Update blog (Protected)
- `DELETE /api/blogs/:id` - Delete blog (Protected)
- `GET /api/blogs/user/:userId` - Get user's blogs
- `PUT /api/blogs/:id/like` - Like/Unlike blog (Protected)

### Comments
- `GET /api/comments/blogs/:blogId/comments` - Get comments for a blog
- `POST /api/comments/blogs/:blogId/comments` - Create comment (Protected)
- `PUT /api/comments/:id` - Update comment (Protected)
- `DELETE /api/comments/:id` - Delete comment (Protected)
- `PUT /api/comments/:id/like` - Like/Unlike comment (Protected)

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
  "excerpt": "Short description...",
  "category": "Technology",
  "tags": ["nodejs", "express", "mongodb"],
  "image": "https://example.com/image.jpg",
  "published": true,
  "featured": false
}
```

### Search and Filter Blogs
```bash
GET /api/blogs?search=nodejs&category=Technology&page=1&limit=10&sort=-createdAt
```

### Get Featured Blogs
```bash
GET /api/blogs/featured
```

### Add Comment to Blog
```bash
POST /api/comments/blogs/:blogId/comments
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "content": "Great article!",
  "parentComment": null  // Optional: for nested comments
}
```

### Change Password
```bash
PUT /api/auth/change-password
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
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
│   ├── blogController.js  # Blog CRUD logic
│   └── commentController.js # Comment logic
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── models/
│   ├── User.js            # User model
│   ├── Blog.js            # Blog model
│   └── Comment.js         # Comment model
├── routes/
│   ├── auth.js            # Auth routes
│   ├── users.js           # User routes
│   ├── blogs.js           # Blog routes
│   └── comments.js        # Comment routes
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
- CORS enabled with explicit URL whitelist (only allowed origins can access the API)

## CORS Configuration

The application uses CORS with an explicit whitelist of allowed origins for security. Only the URLs specified in the `ALLOWED_ORIGINS` environment variable can make requests to the API.

### Configuration

Set the `ALLOWED_ORIGINS` environment variable in your `.env` file:

```env
# Single origin
ALLOWED_ORIGINS=http://localhost:3000

# Multiple origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://yourdomain.com
```

### Default Origins

If `ALLOWED_ORIGINS` is not set, the following defaults are used:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:5173` (Vite default port)

### Important Notes

- Requests with no origin (like mobile apps, Postman, or curl) are allowed
- All other origins will receive a CORS error
- Make sure to include your frontend URL(s) in the whitelist
- In production, use your actual domain(s) instead of localhost

