import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database/database.config';
import { Cliente } from './clientes/cliente.entity';
import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { DatabaseModule } from './database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { ParceirosModule } from './parceiros/parceiros.module';
import { ClienteValidator } from './clientes/cliente.validator';
import { ParceirosService } from './parceiros/parceiros.service';
import { ParceirosController } from './parceiros/parceiros.controller';
import { ParceiroValidator } from './parceiros/parceiro.validator';
import { Parceiro } from './parceiros/parceiro.entity';
import { ManagersModule } from './managers/managers.module';
import { Manager } from './managers/manager.entity';
import { ManagersController } from './managers/managers.controller';
import { ManagersService } from './managers/managers.service';
import { ManagerValidator } from './managers/manager.validator';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Cliente, Parceiro, Manager]),
    DatabaseModule,
    ClientesModule,
    ParceirosModule,
    ManagersModule,
  ],
  controllers: [ClientesController, ParceirosController, ManagersController],
  providers: [
    ClientesService,
    ClienteValidator,
    ParceirosService,
    ParceiroValidator,
    ManagersService,
    ManagerValidator,
  ],
})
export class AppModule {}
