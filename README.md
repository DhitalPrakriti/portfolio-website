# Portfolio Website

Full-stack portfolio with a React frontend and Node/Express + MongoDB backend.

## Features
- Responsive React UI with Tailwind CSS
- Contact form saved to MongoDB
- Projects stored in MongoDB and rendered dynamically
- Admin panel to add/delete projects (login required)

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB Atlas

## Project Structure
```
backend/   # Express API (contacts + projects)
frontend/  # React app
```

## Prerequisites
- Node.js 18+ (or your current LTS)
- MongoDB Atlas connection string

## Environment Variables

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_uri
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
ADMIN_API_KEY=your_long_random_secret
ADMIN_USER=your_username
ADMIN_PASS=your_password
```

Create `frontend/.env`:
```
REACT_APP_API_BASE=http://localhost:5000
```

## Run Locally

Backend:
```
cd backend
npm install
npm start
```

Frontend:
```
cd frontend
npm install
npm start
```

## Admin Panel

The admin panel is visible on the frontend but requires login.
Use your admin credentials to add/delete projects.

## Notes
- Project cards are pulled from MongoDB.
- If no projects exist, the UI may show the default set (if enabled).

