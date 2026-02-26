# Bookstore Project: Step-by-Step Evolution Guide

This document provides a comprehensive breakdown of the development steps taken to build the Bookstore application from scratch.

## Phase 1: Initial Environment Setup

### 1. Folder Structure Creation
- Created the root directory `bookstore`.
- Within the root, created the `Bookstore` project folder.
- Partitioned the project into two main directories:
  - `backend/`: Node.js/Express server.
  - `frontend/`: React/Vite application.

### 2. Backend Initialization
- Initialized the backend with `npm init -y`.
- Configured `package.json` to use ES Modules (`"type": "module"`).
- Installed core dependencies: `express`, `mongoose`, `dotenv`, `cors`, `morgan`, `helmet`, `compression`.
- Set up development tools: `nodemon`.

### 3. Frontend Initialization
- Bootstrapped the React application using Vite: `npm create vite@latest frontend -- --template react`.
- Installed frontend dependencies: `axios`, `react-router-dom`, `zustand`, `lucide-react`, `framer-motion`.
- Configured **Tailwind CSS** for styling and **PostCSS** for CSS processing.

---

## Phase 2: Backend Core & Database

### 1. Database Connection
- Created `backend/src/db.js` using Mongoose to connect to MongoDB.
- Used environmental variables (`.env`) for the MongoDB URI.

### 2. Server Entry Point
- Developed `backend/src/server.js`.
- Configured middleware: `express.json()`, `cors`, `helmet` (security), `morgan` (logging), and `compression`.
- Implemented a health check endpoint `/api/health`.

### 3. Data Models
- Defined schemas in `backend/src/models/`:
  - `User.js`: Fields for name, email, password, and `isAdmin` flag.
  - `Book.js`: Fields for title, author, price, category, and description.
  - `Order.js`: Linking users to purchased books.

---

## Phase 3: Authentication & Security

### 1. Password Hashing
- Integrated `bcryptjs` in `userModel.js` using a `pre-save` middleware to hash passwords automatically before storage.
- Added a `matchPassword` method to the User schema for login verification.

### 2. JWT Implementation
- Created utility functions to generate JWT tokens.
- Developed `authMiddleware.js` to protect routes by validating the `Authorization` header.

### 3. API Protection
- Applied `protect` middleware to sensitive routes (e.g., `/api/users/profile`).
- Configured `express-rate-limit` in `backend/src/middleware/rateLimiters.js` to prevent brute-force attacks.

---

## Phase 4: Frontend Development

### 1. Routing & Layout
- Set up `react-router-dom` in `App.jsx` with routes for:
  - `Home`, `Login`, `Register`, `Profile`, and `Search`.
- Implemented a responsive `Navbar` and `Footer`.

### 2. State Management
- Created a Global Store using **Zustand** (`src/store/`) to manage user authentication state (`useAuthStore`).
- Implemented Axios interceptors for handling API requests and token attachment.

### 3. Feature: User Authentication
- Developed `LoginPage` and `RegisterPage`.
- Connected frontend forms to backend endpoints using Axios.
- Stored user sessions in local storage or Zustand state.

---

## Phase 5: Feature Enhancements

### 1. Interactive Search
- Implemented a dynamic search bar in the frontend.
- Created a backend route for searching books by title or author with regex.
- Updated the UI to display real-time results as the user types.

### 2. Role-Based Access Control (RBAC)
- Enhanced the `isAdmin` functionality.
- Created Admin-only routes and dashboard components.
- Restricted specific actions (like deleting books) to admin users.

### 3. UI/UX Polish
- Added animations using **Framer Motion**.
- Integrated **Lucide React** icons for a modern look.
- Implemented dark/light mode compatibility via Tailwind.

---

## Phase 6: Maintenance & Debugging

### 1. Data Seeding
- Created `backend/src/seed.js` to populate the database with initial book data for testing.
- Added a `npm run seed` script to `package.json`.

### 2. Bug Fixes
- Resolved issues with MongoDB data display and synchronization.
- Fixed frontend rendering bugs related to state updates in Zustand.
- Optimized CORS configurations for production deployment.
