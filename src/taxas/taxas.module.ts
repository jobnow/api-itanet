import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxa } from './taxa.entity';
import { DatabaseModule } from '../database/database.module';
import { TaxasController } from './taxas.controller';
import { TaxasService } from './taxas.service';
@Module({
  imports: [TypeOrmModule.forFeature([Taxa]), DatabaseModule],
  controllers: [TaxasController],
  providers: [TaxasService],
})
export class TaxasModule {}
