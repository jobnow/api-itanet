import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Manager } from './manager.entity';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { ManagerValidator } from './manager.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Manager]), DatabaseModule],
  controllers: [ManagersController],
  providers: [ManagersService, ManagerValidator],
})
export class ManagersModule {}
