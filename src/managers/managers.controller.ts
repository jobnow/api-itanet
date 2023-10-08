import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ManagersService } from './managers.service';
import { Manager } from './manager.entity';
import { ManagerValidator } from './manager.validator';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

config();

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly managersService: ManagersService,
    private readonly managerValidator: ManagerValidator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os administradores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de managers retornada com sucesso!',
  })
  async findAll() {
    const sql = 'SELECT * FROM MANAGER_USER';
    const manager = await this.databaseService.query(sql);
    return manager;
  }

  @ApiBody({
    description: 'Exemplo de criação de Manager',
    type: Manager,
    examples: {
      'Exemplo 1': {
        value: {
          NAME: 'Admin teste',
          EMAIL: 'manager@example.com',
          LOGIN: 'teste123',
          PASSWORD: 'teste456',
          PROFILE_IMAGE: 'url_da_imagem.jpg',
          OCCUPATION: 'Ocupação do Manager',
          COMMENTS: 'Comentários adicionais',
          ADMIN: '0',
        },
      },
    },
  })
  @Post()
  @ApiOperation({ summary: 'Registro de conta - Manager' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro do administrador feito com sucesso!',
  })
  async create(@Body() manager: Manager) {
    const validationErrors = await this.managerValidator.validate(manager);

    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    return this.managersService.create(manager);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista manager por ID' })
  @ApiResponse({
    status: 200,
    description: 'Listagem de informações feita com sucesso!',
  })
  async findId(@Param('id') id: string) {
    const existingManager = await this.managersService.findOneById(id);
    if (!existingManager) {
      return { error: 'Manager não encontrado' };
    }

    return {
      manager: existingManager,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza informações do manager' })
  @ApiResponse({
    status: 200,
    description: 'Atualização do manager por ID feita com sucesso!',
  })
  async update(@Param('id') id: string, @Body() managerData: Manager) {
    const existingManager = await this.managersService.findOneById(id);

    if (!existingManager) {
      return { error: 'Manager não encontrado' };
    }
    Object.assign(existingManager, managerData);

    const updatedManager = await this.managersService.update(existingManager);

    return {
      message: 'Manager atualizado com sucesso',
      manager: updatedManager,
    };
  }

  @ApiBody({
    description: 'Exemplo de login - Manager',
    type: Manager,
    examples: {
      'Exemplo 1': {
        value: {
          LOGIN: 'admin@example.com',
          PASSWORD: 'senha123',
        },
        summary: 'Exemplo 1',
      },
      'Exemplo 2': {
        value: {
          LOGIN: 'manager@example.com',
          PASSWORD: 'senha456',
        },
        summary: 'Exemplo 2',
      },
    },
  })
  @Post('login')
  @ApiOperation({ summary: 'Api de login - Manager' })
  @ApiResponse({
    status: 200,
    description: '',
  })
  async login(@Body() loginData: { LOGIN: string; PASSWORD: string }) {
    const { LOGIN, PASSWORD } = loginData;

    if (!LOGIN) {
      return { error: 'O nome é obrigatório' };
    }

    if (!PASSWORD) {
      return { error: 'A senha é obrigatória' };
    }

    const manager = await this.managersService.findByLogin(LOGIN);

    if (!manager) {
      return { error: 'Credenciais inválidas' };
    }

    const passwordMatch = await bcrypt.compare(PASSWORD, manager.PASSWORD);

    if (!passwordMatch) {
      return { error: 'Credenciais inválidas' };
    }

    const token = jwt.sign({ managerId: manager.ID }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { message: 'Login bem-sucedido', manager, token };
  }
}
