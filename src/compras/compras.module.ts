import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './compra.entity';
import { ComprasController } from './compras.controller';
import { DatabaseModule } from '../database/database.module';
import { ComprasService } from './compras.service';
import { ClientesModule } from 'src/clientes/clientes.module';
import { ProdutosModule } from 'src/produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compra]),
    DatabaseModule,
    ClientesModule,
    ProdutosModule,
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
