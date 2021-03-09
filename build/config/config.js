"use strict";
var path_1 = require("path");
require('dotenv').config();
var PROD_ENV = 'production';
var config = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};
var connectionOptions = {
    type: 'postgres',
    host: config.host,
    port: 5432,
    username: config.user || 'postgres',
    password: config.password || 'postgres',
    database: config.database || 'postgres',
    synchronize: true,
    migrationsRun: true,
    logging: ['warn', 'error'],
    subscribers: [
        path_1.join(__dirname, "subscribers/**/*.ts")
    ],
    migrations: [
        path_1.join(__dirname, 'migrations/*{.ts,.js}')
    ],
    cli: {
        migrationsDir: 'src/migrations'
    },
};
module.exports = connectionOptions;
//# sourceMappingURL=config.js.map