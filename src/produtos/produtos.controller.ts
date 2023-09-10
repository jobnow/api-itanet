import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.entity';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  async findAll(@Req() req) {
    if (!req.user) {
      // Se não houver um usuário autenticado na solicitação, retorne uma mensagem de erro
      return { message: 'Usuário não autenticado' };
    }

    return this.produtosService.findAll();
  }

  @Post()
  @ApiBody({ type: Produto })
  @ApiResponse({ status: 201, type: Produto })
  async create(@Body() produto: Produto) {
    return this.produtosService.create(produto);
  }
}
