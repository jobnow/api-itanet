import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { DatabaseModule } from '../database/database.module';
import { ClienteValidator } from './cliente.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), DatabaseModule],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteValidator],
})
export class ClientesModule {}
