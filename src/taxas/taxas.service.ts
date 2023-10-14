import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxa } from './taxa.entity';

@Injectable()
export class TaxasService {
  constructor(
    @InjectRepository(Taxa) private taxasRepository: Repository<Taxa>,
    private readonly databaseService: DatabaseService,
  ) {}

  async findAll(): Promise<Taxa[]> {
    return await this.taxasRepository.find();
  }

  async findOneById(id: string): Promise<Taxa | undefined> {
    return await this.taxasRepository.findOne({ where: { ID: id } });
  }

  async update(taxa: Taxa): Promise<Taxa> {
    return await this.taxasRepository.save(taxa);
  }
}
