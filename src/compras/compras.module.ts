import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './compra.entity';
import { ComprasController } from './compras.controller';
import { DatabaseModule } from '../database/database.module';
import { ComprasService } from './compras.service';

@Module({
  imports: [TypeOrmModule.forFeature([Compra]), DatabaseModule],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
