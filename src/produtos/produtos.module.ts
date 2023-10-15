import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Produto } from './produto.entity';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
@Module({
  imports: [TypeOrmModule.forFeature([Produto]), DatabaseModule],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
