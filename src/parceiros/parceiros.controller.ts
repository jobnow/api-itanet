import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  // Request,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ParceirosService } from './parceiros.service';
import { ParceiroValidator } from './parceiro.validator';
import { Parceiro } from './parceiro.entity';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
config();

@Controller('parceiros')
@ApiTags('parceiros')
export class ParceirosController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parceirosService: ParceirosService,
    private readonly parceiroValidator: ParceiroValidator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os parceiros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de parceiros retornada com sucesso!',
  })
  async findAll() {
    const sql = 'SELECT * FROM SISTEMA_PARCEIRO';
    const parceiros = await this.databaseService.query(sql);
    return parceiros;
  }

  @ApiBody({
    description: 'Exemplo de criação de Parceiro',
    type: Parceiro,
    examples: {
      'Exemplo 1': {
        value: {
          NAME: 'Cleber Automoveis',
          IMG_LOGO: 'url_da_logo.jpg',
          TELEFONE: '1234567890',
          CNPJ: '12345678901234',
          CEP: '12345-678',
          ESTADO: 'SP',
          CIDADE: 'São Paulo',
          ENDERECO: 'Endereço',
          REPRESENTANTE: 'Cleber',
          EMAIL: 'parceiro@example.com',
          TELEFONE_CELULAR: '9876543210',
          SENHA: 'teste123',
          LATITUDE: '123.456789',
          LONGITUDE: '-12.345678',
          DELIVERY: 'N',
          BANCO: 'Nome do Banco',
          AGENCIA: '1234',
          CONTA: '56789',
          OBSERVACOES: 'Observações da Conta',
          SITUACAO: 'Situação do Parceiro',
        },
      },
    },
  })
  @Post()
  @ApiOperation({ summary: 'Registro de conta - Parceiro' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro do parceiro feito com sucesso!',
  })
  async create(@Body() parceiro: Parceiro) {
    const validationErrors = await this.parceiroValidator.validate(parceiro);

    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    return this.parceirosService.create(parceiro);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista parceiro por ID' })
  @ApiResponse({
    status: 200,
    description: 'Listagem de informações feita com sucesso!',
  })
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
  @ApiOperation({ summary: 'Atualiza informações do manager' })
  @ApiResponse({
    status: 200,
    description: 'Atualização do manager por ID feita com sucesso!',
  })
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

  @ApiBody({
    description: 'Exemplo de login - Parceiro',
    type: Parceiro,
    examples: {
      'Exemplo 1': {
        value: {
          EMAIL: 'parceiro@example.com',
          SENHA: 'senha123',
        },
        summary: 'Exemplo 1',
      },
      'Exemplo 2': {
        value: {
          EMAIL: 'loja@example.com',
          SENHA: 'senha456',
        },
        summary: 'Exemplo 2',
      },
    },
  })
  @Post('login')
  @ApiOperation({ summary: 'Api de login - Parceiro' })
  @ApiResponse({
    status: 200,
    description: '',
  })
  async login(@Body() loginData: { EMAIL: string; SENHA: string }) {
    const { EMAIL, SENHA } = loginData;

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

    const token = jwt.sign(
      { parceiroId: parceiro.ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    return { message: 'Login bem-sucedido', parceiro, token };
  }
  // @Get('user-info')
  // async getUserInfo(@Request() req) {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const user = await this.parceirosService.getUserByToken(token);
  //   return user;
  // }
}
