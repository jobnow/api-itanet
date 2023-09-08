import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managersRepository: Repository<Manager>,
  ) {}

  async create(manager: Manager): Promise<Manager> {
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
}
