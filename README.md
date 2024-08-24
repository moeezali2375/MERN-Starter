# MERN-Starter

## Description

This repository provides a starter template for building MERN stack applications using Vite, React 18+shadcn, and ExpressJS. It includes a complete authentication system to help you kickstart your project with a robust structure.

## Features

- **React 18 with Vite + shadcn**: Faster builds and modern React features with the trending shadcn library.
- **ExpressJS Backend**: Easy-to-use Node.js framework.
- **Full Authentication System**: Pre-built authentication for user login and registration with email notifications.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moeezali2375/MERN-Starter.git
   ```
2. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. **Environment Variables**:

   - Set up your environment variables by creating a `.env` file in the `backend` directory. Refer to the `.env.example` file for required variables and their formats.
   - Similarly, create `.env.local` file in the `frontend` directory. Refer to the `.env.example` file for required variables and their formats.

4. **Database Configuration**:
   - Ensure your database connection is configured correctly in the `.env` file in the `backend` directory. Update the connection string and credentials according to your database setup.

## Usage

1. **Start the Backend Server**:

   - Navigate to the `backend` directory and run:
     ```bash
     cd backend
     npm start
     ```
   - This will start the ExpressJS server on the default port (usually `5000`). You can change the port by modifying the `server.js` file if needed.

2. **Start the Frontend Development Server**:

   - Navigate to the `frontend` directory and run:
     ```bash
     cd ../frontend
     npm run dev
     ```
   - This will start the Vite development server, typically on port `3000`. You can modify the port by editing the `vite.config.js` file.

3. **Access the Application**:

   - Open your browser and go to `http://localhost:3000` to view the frontend. The React application should be running and connected to the backend.

4. **API Endpoints**:

   - The backend API is available at `http://localhost:4000/api`. You can use tools like Postman to test the endpoints or integrate them into your frontend application. There is also a `rest.http` file in the `backend` directory that contains the format for testing the endpoints.

5. **Authentication**:

   - Use the provided endpoints for user registration and login to interact with the authentication system. You can find these endpoints in the backend's documentation or source code.

6. **Build for Production**:

   - To build the frontend for production, run:
     ```bash
     npm run build
     ```
   - This will create optimized static files in the `dist` directory of the `frontend` folder. You can then serve these files using any static file server or integrate them with your backend.
