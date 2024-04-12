# Google Authentication Project Backend

## Description

This project provides an authentication method allowing users to sign up and log in using their Google accounts. It enhances user experience by sending email notifications for profile updates. Key features include:

- Google authentication using Passport.js
- Login and signup routes
- Protected routes
- Email notifications for profile updates
- Email confirmation for account creation

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

#### Installation

To run this app locally, follow these steps:

1. Clone this repository:

    ```bash
    git clone https://github.com/cyusasnave/Google-authentication-project.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Google-authentication-project
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

#### Usage

1. Start the server:

    ```bash
    npm run start
    ```
    Or
     ```bash
    npm run dev
    ```
2. Configuration

    To configure the application, set the following environment variables:
    ```ts
    Create a .env file in the root folder and populate it based on the provided .env.example.
    
     // Server Port 
       PORT=
       
     // Database 
       DB_NAME= 
       DB_USER= 
       DB_PASSWORD=
       
    // Google and Session 
      GOOGLE_CLIENT_ID= 
      GOOGLE_SECRET_ID= 
      GOOGLE_CALLBACK_URL= 
      SESSION_SECRET=
      
    // JWT Secret Key 
      JWT_SECRET_KEY=
      
    // Cloudinary 
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_FOLDER=
    
    // Nodemailer
    ADMINISTRATOR_EMAIL=
    ADMINISTRATOR_NAME=
    NODEMAILER_PASSWORD=
    ```   

3. Access the API endpoints via localhost, for example: [http://localhost:3000](http://localhost:[PORT])

#### API Documentation

The API offers endpoints for login, logout, verification, updating, deleting users, and accessing the dashboard.

##### Example Endpoints
```ts
// Home endpoint providing links for login and creating a new account.
GET /

// Create a new account.
GET /api/auth/google

// Log in
GET /api/auth/google/login

// Verify email confirmation.
GET /api/auth/google/verifyEmail

// Access the dashboard after logging in.
GET /api/auth/google/dashboard

// Log out the user.
GET /api/auth/google/logout

// Handle redirection from Google authentication.
GET /api/auth/google/callback

// Get all users (protected, admin only).
GET /api/auth/google/users

// Get a single user (protected, admin only).
GET /api/auth/google/users/:id

// Update user profile (protected, admin only).
PATCH /api/auth/google/users/:id

// Delete a user (protected, admin only).
DELETE /api/auth/google/users/:id

```

Note: The difference between user and admin profile updates is that a user can only update their own profile, while an admin can update any user's profile.



#### Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature.
3. Make your changes and commit them: git commit -m "Add feature XYZ".
4. Push to your forked repository: git push origin feature/your-feature.
5. Create a pull request.
