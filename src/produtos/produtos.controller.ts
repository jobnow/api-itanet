import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.entity';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  async findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  async getProductDetails(@Param('id') productId: string) {
    const product = await this.produtosService.getProductById(productId);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return { data: product };
  }

  @Post('listar-home')
  async listarHome() {
    return this.produtosService.listarHome();
  }

  @Post('listar-delivery')
  async listarDelivery() {
    return this.produtosService.listarDelivery();
  }

  @Post()
  @ApiBody({ type: Produto })
  @ApiResponse({ status: 201, type: Produto })
  async create(@Body() produto: Produto) {
    return this.produtosService.create(produto);
  }
}
