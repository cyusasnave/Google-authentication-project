// PORT
export const APPLICATION_PORT = process.env.PORT;

// GOOGLE
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

// JWT
export const JWT_KEY = process.env.JWT_SECRET_KEY as string;

// DATABASE
export const DB_NAME = process.env.DB_NAME as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_PASS = process.env.DB_PASSWORD;

// CLOUDINARY
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER as string;

// NODEMAILER
export const ADMINISTRATOR_EMAIL = process.env.ADMINISTRATOR_EMAIL as string;
export const ADMINISTRATOR_NAME = process.env.ADMINISTRATOR_NAME as string;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;
