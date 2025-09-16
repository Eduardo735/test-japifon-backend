import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
//Just for run migrations i think
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [`${__dirname}/src/entities/*.entity.{ts,js}`],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/shared/infrastructure/typeorm/migrations/**/*.ts'],
  ssl: { rejectUnauthorized: false },
});
