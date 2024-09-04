# MERN Stack Authentication Backend

## Overview

This is a backend application developed using the MERN stack (MongoDB, Express.js, React, Node.js) to handle user authentication. It allows users to sign up, sign in, and access protected routes with JWT-based authentication.

## Features

- User Sign-Up
- User Sign-In with JWT Authentication
- Protected Routes

## Prerequisites

- Node.js
- MongoDB Atlas Account
- Git

## Installation

1. **Clone the Repository**:
 
    git clone https://github.com/danyaljbarkhail/mern-auth-backend.git
    cd mern-auth-backend
   

2. **Install Dependencies**:

    npm install
  
3. **Environment Variables**:

   Create a `.env` file in the root directory and add the following:

    MONGODB_URI=mongodb+srv://daniyal:daniyal123@cluster0.yzutgan.mongodb.net/auth?retryWrites=true&w=majority
    JWT_SECRET=your_secret_key
    PORT=5000


4. **Run the Server**:

    npm start

5. **Test the API Endpoints**:

   Use Postman or any other API client to interact with the endpoints.

## Deployment

This application is deployed on Render. You can access the live service [here](https://mern-auth-backend-1di6.onrender.com).

## API Endpoints

- **POST /api/signup**: Register a new user.
- **POST /api/signin**: Authenticate a user and return a JWT token.
- **GET /api/protected**: Access protected content.

## License

This project is licensed under the MIT License.

