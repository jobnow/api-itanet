import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managersRepository: Repository<Manager>,
  ) {}

  async create(manager: Manager): Promise<Manager> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(manager.PASSWORD, saltRounds);

    manager.PASSWORD = hashedPassword;

    return await this.managersRepository.save(manager);
  }

  async findAll(): Promise<Manager[]> {
    return await this.managersRepository.find();
  }

  async findOneById(id: string): Promise<Manager | undefined> {
    return await this.managersRepository.findOne({ where: { ID: id } });
  }

  async update(manager: Manager): Promise<Manager> {
    return await this.managersRepository.save(manager);
  }

  async findByLogin(login: string): Promise<Manager | null> {
    const manager = await this.managersRepository.findOne({
      where: { LOGIN: login },
    });

    return manager || null;
  }
}
