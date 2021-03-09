"use strict";
var connectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["dist/src/entity/**/*.js"],
    migrations: ["dist/src/migration/**/*.js"],
    subscribers: ["dist/src/subscriber/**/*.js"],
    cli: {
        entitiesDir: "dist/src/entity",
        migrationsDir: "dist/src/migration",
        subscribersDir: "dist/src/subscriber"
    }
};
module.exports = connectionOptions;
//# sourceMappingURL=ormconfig.js.map