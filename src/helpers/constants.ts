export const APPLICATION_PORT = process.env.PORT;

export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

export const JWT_KEY = process.env.JWT_SECRET_KEY as string;

export const DB_NAME = process.env.DB_NAME as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_PASS = process.env.DB_PASSWORD;