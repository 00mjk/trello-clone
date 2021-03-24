"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.CRYPTO_SOIL = exports.DB_NAME = exports.DB_PASS = exports.DB_USER = exports.DB_HOST = void 0;
require('dotenv').config();
exports.DB_HOST = 'localhost';
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.DB_NAME = process.env.DB_NAME;
exports.CRYPTO_SOIL = +(process.env.CRYPTO_SOIL) || 10;
exports.JWT_SECRET = process.env.JWT_SECRET;
//# sourceMappingURL=constants.js.map