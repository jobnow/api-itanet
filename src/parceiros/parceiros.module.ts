import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parceiro } from './parceiro.entity';
import { ParceirosService } from './parceiros.service';
import { ParceirosController } from './parceiros.controller';
import { DatabaseModule } from '../database/database.module';
import { ParceiroValidator } from './parceiro.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Parceiro]), DatabaseModule],
  controllers: [ParceirosController],
  providers: [ParceirosService, ParceiroValidator],
})
export class ParceirosModule {}
