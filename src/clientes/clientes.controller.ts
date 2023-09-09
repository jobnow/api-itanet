import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  // UseGuards,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente.entity';
import { ClienteValidator } from './cliente.validator';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
// import { JwtMiddleware } from '../auth/middleware.config';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
config();
@Controller('clientes')
@ApiTags('clientes')
export class ClientesController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly clientesService: ClientesService,
    private readonly clienteValidator: ClienteValidator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso',
  })
  async findAll() {
    const sql = 'SELECT * FROM SISTEMA_CLIENTE';
    const clientes = await this.databaseService.query(sql);
    return clientes;
  }

  @ApiBody({
    description: 'Exemplo de criação de Cliente',
    type: Cliente,
    examples: {
      'Exemplo 1': {
        value: {
          NAME: 'João Silva',
          EMAIL: 'joao@example.com',
          SENHA: 'senha123',
          DT_NASCIMENTO: '1990-01-01',
          CPF: '123.456.789-00',
          TELEFONE: '21984418877',
          ENDERECO:
            '{"Logradouro":"Rua Exemplo","Numero":"123","Bairro":"Centro","Cidade":"Exemplo","Estado":"SP","Cep":"12345-678"}',
          CARTAO:
            '{"final":"1234","bandeira":"VISA","codigo":"1234567890123456","cvc":"123"}',
          ITACOINS: '39600',
          PAGAMENTO: 'CUS-R45ON4VQCR09',
        },
        summary: 'Exemplo 1',
      },
      'Exemplo 2': {
        value: {
          NAME: 'Maria Santos',
          EMAIL: 'maria@example.com',
          SENHA: 'senha456',
          DT_NASCIMENTO: '1995-02-15',
          CPF: '987.654.321-00',
          TELEFONE: '21999999999',
          ENDERECO:
            '{"Logradouro":"Rua Teste","Numero":"456","Bairro":"Centro","Cidade":"Teste","Estado":"RJ","Cep":"54321-987"}',
          CARTAO:
            '{"final":"5678","bandeira":"MASTERCARD","codigo":"9876543210987654","cvc":"456"}',
          ITACOINS: '25000',
          PAGAMENTO: 'CUS-ABCXYZ123456',
        },
        summary: 'Exemplo 2',
      },
    },
  })
  @Post()
  @ApiOperation({ summary: 'Registro de conta - Cliente' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro do cliente feito com sucesso!',
  })
  async create(@Body() cliente: Cliente) {
    const validationErrors = await this.clienteValidator.validate(cliente);

    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    return this.clientesService.create(cliente);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista cliente por ID' })
  @ApiResponse({
    status: 200,
    description: 'Listagem de informações feita com sucesso!',
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findId(@Param('id') id: string) {
    const existingCliente = await this.clientesService.findOneById(id);
    if (!existingCliente) {
      return { error: 'Cliente não encontrado' };
    }

    return {
      cliente: existingCliente,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza informações do cliente' })
  @ApiResponse({
    status: 200,
    description: 'Atualização do cliente por ID feita com sucesso!',
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async update(@Param('id') id: string, @Body() clienteData: Cliente) {
    const existingCliente = await this.clientesService.findOneById(id);

    if (!existingCliente) {
      return { error: 'Cliente não encontrado' };
    }
    Object.assign(existingCliente, clienteData);

    const updatedCliente = await this.clientesService.update(existingCliente);

    return {
      message: 'Cliente atualizado com sucesso',
      cliente: updatedCliente,
    };
  }

  // @UseGuards(JwtMiddleware)
  // @Get('teste')
  // async teste() {
  //   return {
  //     message: 'teste',
  //   };
  // }

  @ApiBody({
    description: 'Exemplo de login - Cliente',
    type: Cliente,
    examples: {
      'Exemplo 1': {
        value: {
          EMAIL: 'joao@example.com',
          SENHA: 'senha123',
        },
        summary: 'Exemplo 1',
      },
      'Exemplo 2': {
        value: {
          EMAIL: 'maria@example.com',
          SENHA: 'senha456',
        },
        summary: 'Exemplo 2',
      },
    },
  })
  @ApiOperation({ summary: 'Api de login - Cliente' })
  @ApiResponse({
    status: 200,
    description: '',
  })
  @Post('login')
  async login(@Body() loginData: { EMAIL: string; SENHA: string }) {
    const { EMAIL, SENHA } = loginData;

    if (!EMAIL) {
      return { error: 'O email é obrigatório' };
    }

    if (!SENHA) {
      return { error: 'A senha é obrigatória' };
    }

    const cliente = await this.clientesService.findByEmailAndPassword(
      EMAIL,
      SENHA,
    );

    if (!cliente) {
      return { error: 'Credenciais inválidas' };
    }

    jwt.sign({ clienteId: cliente.ID }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { message: 'Login bem-sucedido', cliente };
    // res.redirect(302, '/clientes/teste');
  }
}
