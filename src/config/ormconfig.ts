import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenvConfig({ path: join(__dirname, '../../.env.dev') });

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 80,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
});
