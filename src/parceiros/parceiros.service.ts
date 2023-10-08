import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parceiro } from './parceiro.entity';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ParceirosService {
  constructor(
    @InjectRepository(Parceiro)
    private parceirosRepository: Repository<Parceiro>, // private jwtService: JwtService, // Injete o serviço JwtService
  ) {}

  async create(parceiro: Parceiro): Promise<Parceiro> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(parceiro.SENHA, saltRounds);

    parceiro.SENHA = hashedPassword;

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

  async findByEmail(email: string): Promise<Parceiro | null> {
    const parceiro = await this.parceirosRepository.findOne({
      where: { EMAIL: email },
    });

    return parceiro || null;
  }
}
