import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database/database.config';
import { Cliente } from './clientes/cliente.entity';
import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { DatabaseModule } from './database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { ParceirosModule } from './parceiros/parceiros.module';
// import { ClienteValidator } from './clientes/cliente.validator';
import { ParceirosService } from './parceiros/parceiros.service';
import { ParceirosController } from './parceiros/parceiros.controller';
import { ParceiroValidator } from './parceiros/parceiro.validator';
import { Parceiro } from './parceiros/parceiro.entity';
import { ManagersModule } from './managers/managers.module';
import { Manager } from './managers/manager.entity';
import { ManagersController } from './managers/managers.controller';
import { ManagersService } from './managers/managers.service';
import { ManagerValidator } from './managers/manager.validator';
import { ProdutosModule } from './produtos/produtos.module';
import { ProdutosController } from './produtos/produtos.controller';
import { ProdutosService } from './produtos/produtos.service';
import { Produto } from './produtos/produto.entity';
import { AuthModule } from './auth/auth.module';
import { BannersModule } from './banners/banners.module';
import { BannersController } from './banners/banners.controller';
import { BannersService } from './banners/banners.service';
import { Banner } from './banners/banner.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/middleware.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Cliente, Parceiro, Manager, Produto, Banner]),
    DatabaseModule,
    ClientesModule,
    ParceirosModule,
    ManagersModule,
    ProdutosModule,
    AuthModule,
    BannersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    ClientesController,
    ParceirosController,
    ManagersController,
    ProdutosController,
    BannersController,
  ],
  providers: [
    ClientesService,
    // ClienteValidator,
    ParceirosService,
    ParceiroValidator,
    ManagersService,
    ManagerValidator,
    ProdutosService,
    BannersService,
    JwtStrategy,
  ],
})
export class AppModule {}
