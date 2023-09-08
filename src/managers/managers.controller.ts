import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ManagersService } from './managers.service';
import { Manager } from './manager.entity';
import { ManagerValidator } from './manager.validator';

@Controller('managers')
export class ManagersController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly managersService: ManagersService,
    private readonly managerValidator: ManagerValidator,
  ) {}

  @Get()
  async findAll() {
    const sql = 'SELECT * FROM MANAGER_USER';
    const manager = await this.databaseService.query(sql);
    return manager;
  }

  @Post()
  async create(@Body() manager: Manager) {
    const validationErrors = await this.managerValidator.validate(manager);

    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    return this.managersService.create(manager);
  }

  @Get(':id')
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
}
