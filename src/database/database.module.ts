import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';
import { DatabaseService } from './database.service';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
