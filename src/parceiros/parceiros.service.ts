import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parceiro } from './parceiro.entity';

@Injectable()
export class ParceirosService {
  constructor(
    @InjectRepository(Parceiro)
    private parceirosRepository: Repository<Parceiro>,
  ) {}

  async create(parceiro: Parceiro): Promise<Parceiro> {
    return await this.parceirosRepository.save(parceiro);
  }

  async findAll(): Promise<Parceiro[]> {
    return await this.parceirosRepository.find();
  }

  async findOneById(id: string): Promise<Parceiro | undefined> {
    return await this.parceirosRepository.findOne({ where: { ID: id } });
  }

  async update(parceiro: Parceiro): Promise<Parceiro> {
    return await this.parceirosRepository.save(parceiro);
  }

  async findByEmailAndPassword(
    email: string,
    senha: string,
  ): Promise<Parceiro | null> {
    const parceiro = await this.parceirosRepository.findOne({
      where: { EMAIL: email, SENHA: senha },
    });

    return parceiro || null;
  }
}
