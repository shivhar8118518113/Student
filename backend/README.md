# Week1 Backend — Full Documentation

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Folder & File Structure](#folder--file-structure)
3. [Environment Setup](#environment-setup)

5. [Authentication (JWT)](#authentication-jwt)
6. [User Model & Auth Flow](#user-model--auth-flow)
7. [Resource Model & API](#resource-model--api)
8. [Product Model & API](#product-model--api)
9. [Middleware](#middleware)
10. [Controllers](#controllers)
11. [Routes](#routes)
12. [Example API Flow](#example-api-flow)
13. [Troubleshooting](#troubleshooting)
14. [Best Practices & Recommendations](#best-practices--recommendations)

---

## Project Overview

This backend project is built with Node.js, Express, and MongoDB (Mongoose). It provides:
- JWT-based authentication
- Universal Resource API (CRUD, linked to logged-in user)
- Product API (CRUD)
- Modular structure for scalability

---

## Folder & File Structure

```
backend/
│   .env

│   package.json
│   server.js
│   README.md
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── resourceController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Product.js
│   ├── Resource.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── products.js
│   └── resourceRoutes.js
```

### File/Folder Details

- **.env**: Environment variables (MongoDB URI, JWT secret, etc.)
- **index.js**: Entry point (can be used for custom startup logic)
- **package.json**: Project dependencies and scripts
- **server.js**: Main server file, mounts routes and middleware
- **config/db.js**: MongoDB connection logic
- **controllers/**: Business logic for authentication and resources
- **middleware/authMiddleware.js**: JWT authentication protection
- **models/**: Mongoose schemas for User, Product, Resource
- **routes/**: Express route definitions for API endpoints

---

## Environment Setup

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Create a `.env` file:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Start the server:
   ```powershell
   node server.js
   ```

---

## Configuration

- **MongoDB**: Connection handled in `config/db.js` and `server.js`
- **JWT**: Secret key from `.env` or default
- **CORS**: Enabled for API access

---

## Authentication (JWT)

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Protected routes**: Require `Authorization: Bearer <token>` header
- **JWT Middleware**: Validates token, sets `req.user`

---

## User Model & Auth Flow

### User Model (`models/User.js`)
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
```

### Auth Controller (`controllers/authController.js`)
- **registerUser**: Validates, hashes password, saves user
- **loginUser**: Validates, checks password, returns JWT

### Auth Routes (`routes/authRoutes.js`)
```js
router.post('/register', registerUser);
router.get('/me', authMiddleware, (req, res) => res.json(req.user));
```
```js
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
}, { timestamps: true });
```

- **getResourceById**: Gets single resource if owned
- **updateResource**: Updates resource if owned
- **deleteResource**: Deletes resource if owned

### Resource Routes (`routes/resourceRoutes.js`)
```js
router.post("/", authMiddleware, createResource);
router.get("/", authMiddleware, getResources);
router.get("/:id", authMiddleware, getResourceById);
router.put("/:id", authMiddleware, updateResource);
router.delete("/:id", authMiddleware, deleteResource);
```

---
## Product Model & API

### Product Model (`models/Product.js`)
```js
  price: { type: Number, required: true },
  description: { type: String }
```js
router.post('/', async (req, res) => {
  const products = await Product.find();
});
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);


## Middleware
  }


## Controllers
- **authController.js**: Handles user registration and login

---
- **resourceRoutes.js**: `/api/resources` endpoints

---

## Example API Flow

```powershell
curl -Method POST -Uri http://localhost:5000/api/auth/register -ContentType 'application/json' -Body '{ "name":"Alice", "email":"alice@example.com", "password":"password123" }'
### 2. Login and Get Token
$resp = curl -Method POST -Uri http://localhost:5000/api/auth/login -ContentType 'application/json' -Body '{ "email":"alice@example.com", "password":"password123" }' | ConvertFrom-Json
$token = $resp.token
```
```powershell
curl -Method POST -Uri http://localhost:5000/api/resources -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body '{ "title":"Buy groceries", "description":"Milk, Eggs", "category":"Personal", "amount":200 }'

### 4. Get All Resources
```powershell
curl -Method GET -Uri http://localhost:5000/api/resources -Headers @{ Authorization = "Bearer $token" }
```powershell
curl -Method PUT -Uri http://localhost:5000/api/resources/<resourceId> -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body '{ "status":"completed" }'

### 6. Delete a Resource
```powershell
curl -Method DELETE -Uri http://localhost:5000/api/resources/<resourceId> -Headers @{ Authorization = "Bearer $token" }

### 7. Create a Product
### 8. Get All Products
curl -Method GET -Uri http://localhost:5000/api/products
```

### 9. Update a Product
```powershell
curl -Method PUT -Uri http://localhost:5000/api/products/<productId> -ContentType 'application/json' -Body '{ "price":45000 }'
```

### 10. Delete a Product
```powershell
curl -Method DELETE -Uri http://localhost:5000/api/products/<productId>
```

---

## Troubleshooting

- **No token, authorization denied**: Check `Authorization` header format
- **Token is not valid**: Token may be expired or JWT secret mismatch
- **Not found on update/delete**: Wrong id or resource does not belong to user
- **MongoDB connection error**: Check `MONGO_URI` in `.env`

---

## Best Practices & Recommendations

- Use environment variables for secrets
- Hash passwords before saving
- Validate input data (add Joi or express-validator)
- Use async/await for database operations
- Modularize controllers and routes
- Write tests (Jest + supertest)
- Create a Postman collection for API requests
- Never commit `.env` or secrets to source control

---

## API Operations Explained

### AUTH API

#### 1. Register User
- **Endpoint:** `POST /api/auth/register`
- **Purpose:** Create a new user account
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Alice",
    "email": "alice@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "...",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
  ```
- **Errors:**
  - 400: Missing fields or email already registered
  - 500: Server error

#### 2. Login User
- **Endpoint:** `POST /api/auth/login`
- **Purpose:** Authenticate user and receive JWT token
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "alice@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "<JWT_TOKEN>",
    "user": { "_id": "...", "name": "Alice", "email": "alice@example.com" }
  }
  ```
- **Errors:**
  - 400: Invalid credentials
  - 500: Server error

#### 3. Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Purpose:** Get info about the logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": "...",
    "email": "alice@example.com"
  }
  ```
- **Errors:**
  - 401: No token or invalid token

---

### RESOURCE API

#### 1. Create Resource
- **Endpoint:** `POST /api/resources`
- **Purpose:** Add a new resource linked to the logged-in user
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "title": "Pay rent",
    "description": "Monthly house rent",
    "category": "Finance",
    "status": "pending",
    "amount": 12000
  }
  ```
- **Response:**
  ```json
  {
    "message": "Resource created",
    "resource": {
      "_id": "...",
      "title": "Pay rent",
      "description": "Monthly house rent",
      "category": "Finance",
      "status": "pending",
      "amount": 12000,
      "createdBy": "<userId>",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Errors:**
  - 400: Validation error (missing title, etc.)
  - 401: No token or invalid token

#### 2. Get All Resources
- **Endpoint:** `GET /api/resources`
- **Purpose:** Get all resources created by the logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "...",
      "title": "Pay rent",
      "createdBy": "<userId>",
      ...
    },
    ...
  ]
  ```
- **Errors:**
  - 401: No token or invalid token

#### 3. Get Single Resource
- **Endpoint:** `GET /api/resources/:id`
- **Purpose:** Get a specific resource (only if owned by user)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "...",
    "title": "Pay rent",
    ...
  }
  ```
- **Errors:**
  - 404: Not found or not owned by user
  - 401: No token or invalid token

#### 4. Update Resource
- **Endpoint:** `PUT /api/resources/:id`
- **Purpose:** Update a resource (only if owned by user)
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Updated",
    "resource": {
      "_id": "...",
      "status": "completed",
      ...
    }
  }
  ```
- **Errors:**
  - 404: Not found or not owned by user
  - 401: No token or invalid token

#### 5. Delete Resource
- **Endpoint:** `DELETE /api/resources/:id`
- **Purpose:** Delete a resource (only if owned by user)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Deleted"
  }
  ```
- **Errors:**
  - 404: Not found or not owned by user
  - 401: No token or invalid token

---

### PRODUCT API

#### 1. Create Product
- **Endpoint:** `POST /api/products`
- **Purpose:** Add a new product
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Smartphone",
    "price": 25000,
    "description": "Latest model with 5G"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "...",
    "name": "Smartphone",
    "price": 25000,
    "description": "Latest model with 5G"
  }
  ```
- **Errors:**
  - 400: Validation error

#### 2. Get All Products
- **Endpoint:** `GET /api/products`
- **Purpose:** Get all products
- **Response:**
  ```json
  [
    {
      "_id": "...",
      "name": "Smartphone",
      "price": 25000,
      "description": "Latest model with 5G"
    },
    ...
  ]
  ```

#### 3. Update Product
- **Endpoint:** `PUT /api/products/:id`
- **Purpose:** Update a product
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "price": 22000
  }
  ```
- **Response:**
  ```json
  {
    "_id": "...",
    "name": "Smartphone",
    "price": 22000,
    "description": "Latest model with 5G"
  }
  ```
- **Errors:**
  - 404: Product not found

#### 4. Delete Product
- **Endpoint:** `DELETE /api/products/:id`
- **Purpose:** Delete a product
- **Response:**
  ```json
  {
    "message": "Product removed"
  }
  ```
- **Errors:**
  - 404: Product not found

---

## API Error Codes Summary
- **400 Bad Request**: Invalid input, missing fields
- **401 Unauthorized**: Missing or invalid JWT
- **403 Forbidden**: Accessing resource not owned by user
- **404 Not Found**: Resource or product not found
- **500 Internal Server Error**: Unexpected server error

---

## End of Documentation

This README covers all major files, folders, and flows in your backend. For further improvements, add validation, tests, and API documentation tools like Swagger.

If you need more examples, Postman collections, or test scripts, let me know!
  


  
