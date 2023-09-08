import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ParceirosService } from './parceiros.service';
import { ParceiroValidator } from './parceiro.validator';
import { Parceiro } from './parceiro.entity';

@Controller('parceiros')
export class ParceirosController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parceirosService: ParceirosService,
    private readonly parceiroValidator: ParceiroValidator,
  ) {}

  @Get()
  async findAll() {
    const sql = 'SELECT * FROM SISTEMA_PARCEIRO';
    const parceiros = await this.databaseService.query(sql);
    return parceiros;
  }

  @Post()
  async create(@Body() parceiro: Parceiro) {
    const validationErrors = await this.parceiroValidator.validate(parceiro);

    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    return this.parceirosService.create(parceiro);
  }

  @Get(':id')
  async findId(@Param('id') id: string) {
    const existingParceiro = await this.parceirosService.findOneById(id);
    if (!existingParceiro) {
      return { error: 'Parceiro não encontrado' };
    }

    return {
      parceiro: existingParceiro,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() parceiroData: Parceiro) {
    const existingParceiro = await this.parceirosService.findOneById(id);

    if (!existingParceiro) {
      return { error: 'Parceiro não encontrado' };
    }
    Object.assign(existingParceiro, parceiroData);

    const updatedParceiro =
      await this.parceirosService.update(existingParceiro);

    return {
      message: 'Parceiro atualizado com sucesso',
      parceiro: updatedParceiro,
    };
  }
}
