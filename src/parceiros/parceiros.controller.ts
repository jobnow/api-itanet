import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ParceirosService } from './parceiros.service';
import { ParceiroValidator } from './parceiro.validator';
import { Parceiro } from './parceiro.entity';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

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

  @Post('login')
  async login(@Body() loginData: { EMAIL: string; SENHA: string }) {
    const { EMAIL, SENHA } = loginData;

    // Verifique se o email e a senha estão presentes
    if (!EMAIL) {
      return { error: 'O email é obrigatório' };
    }

    if (!SENHA) {
      return { error: 'A senha é obrigatória' };
    }

    const parceiro = await this.parceirosService.findByEmailAndPassword(
      EMAIL,
      SENHA,
    );

    if (!parceiro) {
      return { error: 'Credenciais inválidas' };
    }

    jwt.sign({ parceiroId: parceiro.ID }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { message: 'Login bem-sucedido', parceiro };
    // res.redirect(302, '/clientes/teste');
  }
}
