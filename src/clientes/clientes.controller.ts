import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente.entity';
import { ClienteValidator } from './cliente.validator';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { JwtMiddleware } from '../auth/middleware.config';
config();
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly clientesService: ClientesService,
    private readonly clienteValidator: ClienteValidator,
  ) {}

  @Get()
  async findAll() {
    const sql = 'SELECT * FROM SISTEMA_CLIENTE';
    const clientes = await this.databaseService.query(sql);
    return clientes;
  }

  @Post()
  async create(@Body() cliente: Cliente) {
    const validationErrors = await this.clienteValidator.validate(cliente);

    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    return this.clientesService.create(cliente);
  }

  @Get(':id')
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

  @UseGuards(JwtMiddleware)
  @Get('teste')
  async teste() {
    return {
      message: 'teste',
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
