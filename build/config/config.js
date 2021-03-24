"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.encryptOptions = exports.connectionOptions = void 0;
require('dotenv').config();
const PROD_ENV = 'production';
const config = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};
exports.connectionOptions = {
    type: 'postgres',
    host: config.host,
    port: 5432,
    username: config.user || 'postgres',
    password: config.password || 'postgres',
    database: config.database || 'postgres',
};
exports.encryptOptions = {
    soil: +(process.env.CRYPTO_SOIL) || 10
};
exports.jwtSecret = process.env.JWT_SECRET;
//# sourceMappingURL=config.js.map