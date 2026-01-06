# HTTP Server Project (Node.js + Express)

This project demonstrates how to build an HTTP server using Node.js and Express.js, including routing, middleware, and JWT-based authentication.  
The frontend and backend run on separate ports and are started independently.

---

## Features

- HTTP server using Express.js
- REST API endpoints
- JWT authentication
- Custom middleware
- Secret key stored in a separate JavaScript file
- Frontend and backend run on different ports

---

## Tech Stack

- Node.js
- Express.js
- React
- JavaScript (ES Modules)
- JWT (JSON Web Tokens)

---

## Secret Handling

This project does not use a `.env` file.

The JWT secret is stored in a separate JavaScript file and imported wherever needed.

```
import { JWT_SECRET } from "./config.js";
```

---

## Installation and Setup

### Clone the repository

```
git clone https://github.com/im-anuj/coding-platform.git
cd coding-platform
```

---

### Install backend dependencies

```bash
cd backend
npm install
```

---

### Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

### Start the backend server

```bash
cd ../backend
npm start
```

Backend runs on:

```
http://localhost:3000
```

---

### Start the frontend server

In a separate terminal:

```
cd frontend
npm run dev
``` 

Frontend runs on:

```
http://localhost:5173
```

Both frontend and backend servers must be running at the same time.

---

## Frontend and Backend Communication

- The React frontend sends HTTP requests to the backend API
- The backend processes requests and returns responses
- JWT tokens are sent in request headers for protected routes

---

## Authentication Flow (JWT)

1. User logs in or signs up
2. Server generates a JWT token
3. Token is sent to the frontend
4. Frontend stores the token
5. Token is sent with every protected request
6. Middleware verifies the token
7. Access is granted to protected routes

---

## Middleware Usage

Middleware is used to:

- Verify JWT tokens
- Protect routes
- Process requests before reaching route handlers

Example:

```
app.get("/me", auth, (req, res) => {
  res.json({ userId: req.userId });
});
```

---

## Common Issues

- Backend not running will cause frontend API calls to fail
- Invalid or missing token will result in authentication errors
- Incorrect backend port requires updating the frontend API URL

---

## Future Improvements

- Move secrets to environment variables
- Add database integration
- Implement role-based authentication
- Configure deployment

---

## Author

**im_anuj**

*Learning backend development, HTTP servers, and authentication*