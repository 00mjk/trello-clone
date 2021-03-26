require('dotenv').config();
export const DB_HOST = 'localhost';
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;
export const CRYPTO_SOIL = +process.env.CRYPTO_SOIL || 10;
export const JWT_SECRET = process.env.JWT_SECRET;
