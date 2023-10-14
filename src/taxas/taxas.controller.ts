import { DatabaseService } from './../database/database.service';
import { Controller, Put, Param, Get, Body } from '@nestjs/common';
import { TaxasService } from './taxas.service';
import { Taxa } from './taxa.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Taxas')
@Controller('taxas')
export class TaxasController {
  constructor(
    private readonly taxasService: TaxasService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista a taxa' })
  @ApiResponse({
    status: 200,
  })
  async findAll() {
    const sql = 'SELECT * FROM SISTEMA_TAXA';
    const taxas = await this.databaseService.query(sql);
    return { data: taxas };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza informações da taxa' })
  @ApiResponse({
    status: 200,
  })
  async update(@Param('id') id: string, @Body() taxaData: Taxa) {
    const existingTaxa = await this.taxasService.findOneById(id);

    Object.assign(existingTaxa, taxaData);

    const updatedTaxa = await this.taxasService.update(existingTaxa);

    return {
      message: 'Taxa atualizado com sucesso',
      taxa: updatedTaxa,
    };
  }
}
