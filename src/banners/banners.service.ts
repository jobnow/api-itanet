import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private bannersRepository: Repository<Banner>,
  ) {}

  async create(banner: Banner): Promise<Banner> {
    return await this.bannersRepository.save(banner);
  }

  async findAll(): Promise<Banner[]> {
    return await this.bannersRepository.find();
  }

  async findOneById(id: string): Promise<Banner | undefined> {
    return await this.bannersRepository.findOne({ where: { ID: id } });
  }

  //   async update(cliente: Cliente): Promise<Cliente> {
  //     return await this.clientesRepository.save(cliente);
  //   }
}
