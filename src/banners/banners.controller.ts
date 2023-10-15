import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { BannersService } from './banners.service';
import { Banner } from './banner.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('banners')
@ApiTags('banners')
export class BannersController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly bannersService: BannersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Lista todos os banners ativos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de banners retornada com sucesso',
  })
  async findAll() {
    const sql = 'SELECT * FROM SISTEMA_BANNER WHERE DELETED = "0"';
    const banners = await this.databaseService.query(sql);
    return { data: banners };
  }

  @ApiBody({
    description: 'Exemplo de criação de Banner',
    type: Banner,
    examples: {
      'Exemplo 1': {
        value: {
          NAME: 'Monitor Led 17.1 Widescreen',
          IMG_BANNER: 'imagemMonitor.jpg',
          LINK_BANNER: 'app.itanet.com.br/detalhe-oferta/monitor',
        },
        summary: 'Exemplo 1',
      },
    },
  })
  @Post('registrar')
  @ApiOperation({ summary: 'Registro do banner - Manager' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro do banner feito com sucesso!',
  })
  async create(@Body() banner: Banner) {
    return this.bannersService.create(banner);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista banner por ID' })
  @ApiResponse({
    status: 200,
    description: 'Listagem de informações feita com sucesso!',
  })
  @ApiResponse({ status: 404, description: 'Banner não encontrado' })
  async findId(@Param('id') id: string) {
    const existingBanner = await this.bannersService.findOneById(id);
    if (!existingBanner) {
      return { error: 'Banner não encontrado' };
    }

    return {
      banner: existingBanner,
    };
  }
}
