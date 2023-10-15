import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente): Promise<Cliente> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(cliente.SENHA, saltRounds);

    cliente.SENHA = hashedPassword;

    return await this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clientesRepository.find();
  }

  async findOneById(id: string): Promise<Cliente | undefined> {
    return await this.clientesRepository.findOne({ where: { ID: id } });
  }

  async update(cliente: Cliente): Promise<Cliente> {
    return await this.clientesRepository.save(cliente);
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const cliente = await this.clientesRepository.findOne({
      where: { EMAIL: email },
    });

    return cliente || null;
  }
}
