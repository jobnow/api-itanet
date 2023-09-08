import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database/database.config';
import { Cliente } from './clientes/cliente.entity';
import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { DatabaseModule } from './database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { ClienteValidator } from './clientes/cliente.validator';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Cliente]),
    DatabaseModule,
    ClientesModule,
  ],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteValidator],
})
export class AppModule {}
