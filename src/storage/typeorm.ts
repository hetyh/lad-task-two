import 'reflect-metadata';
import { User } from '../entity/User.js';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

/**
 * Returns initialized typeORM connection
 */
async function typeorm() {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    // parseInt() will return string or NaN
    // @ts-ignore
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'test',
    password: process.env.POSTGRES_PASSWORD || 'test',
    database: process.env.POSTGRES_DB || 'test',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
  });

  return await AppDataSource.initialize();
}

export default typeorm;
