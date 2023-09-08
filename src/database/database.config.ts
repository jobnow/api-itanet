import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'ITANET',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};

export default databaseConfig;
