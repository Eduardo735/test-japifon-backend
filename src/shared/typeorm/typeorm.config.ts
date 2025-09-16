import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { allEntities } from 'src/entities';

async function asyncConfigTypeORM(): Promise<TypeOrmModuleOptions> {
  return Promise.resolve({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: allEntities,
    synchronize: false,
    migrationsRun: true,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export default asyncConfigTypeORM;
