import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './src/core/entities/user.entity';

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [User],
  migrations: [process.env.TYPEORM_MIGRATIONS],
});

export default appDataSource;
