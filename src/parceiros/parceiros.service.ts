import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parceiro } from './parceiro.entity';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ParceirosService {
  constructor(
    @InjectRepository(Parceiro)
    private parceirosRepository: Repository<Parceiro>, // private jwtService: JwtService, // Injete o serviço JwtService
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

  // async getUserByToken(token: string): Promise<Parceiro | null> {
  //   try {
  //     const decoded = this.jwtService.verify(token);
  //     const userId = decoded.sub; // Suponhamos que o token contenha o ID do usuário no campo "sub"

  //     return await this.parceirosRepository.findOne(userId);
  //   } catch (error) {
  //     return null; // Retorne null se houver erro na verificação do token ou se o usuário não for encontrado
  //   }
  // }
}
