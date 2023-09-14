import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { DatabaseModule } from '../database/database.module';
// import { ClienteValidator } from './cliente.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), DatabaseModule],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
