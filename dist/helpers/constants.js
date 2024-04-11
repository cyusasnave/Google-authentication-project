"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODEMAILER_PASSWORD = exports.ADMINISTRATOR_NAME = exports.ADMINISTRATOR_EMAIL = exports.CLOUDINARY_FOLDER = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.DB_PASS = exports.DB_USER = exports.DB_NAME = exports.JWT_KEY = exports.GOOGLE_CALLBACK_URL = exports.GOOGLE_SECRET_ID = exports.GOOGLE_CLIENT_ID = exports.SESSION_SECRET = exports.APPLICATION_PORT = void 0;
// PORT
exports.APPLICATION_PORT = process.env.PORT;
// GOOGLE
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;
exports.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
// JWT
exports.JWT_KEY = process.env.JWT_SECRET_KEY;
// DATABASE
exports.DB_NAME = process.env.DB_NAME;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASSWORD;
// CLOUDINARY
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER;
// NODEMAILER
exports.ADMINISTRATOR_EMAIL = process.env.ADMINISTRATOR_EMAIL;
exports.ADMINISTRATOR_NAME = process.env.ADMINISTRATOR_NAME;
exports.NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
