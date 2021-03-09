import { ConnectionOptions } from 'typeorm'
import { join } from 'path'
require('dotenv').config()

const PROD_ENV = 'production'

const config = {
  host: 'localhost',
  user:  process.env.DB_USER,
  password: process.env.DB_PASS,
  database:  process.env.DB_NAME,
}

const connectionOptions : ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user || 'postgres',
  password: config.password || 'postgres',
  database: config.database || 'postgres',
  synchronize: false,
  logging: ['warn', 'error'],
  migrations: [
    join(__dirname, 'migrations/*{.ts,.js}')
  ],
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export = connectionOptions