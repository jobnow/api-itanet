import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto) private produtosRepository: Repository<Produto>,
  ) {}

  async create(produto: Produto): Promise<Produto> {
    return await this.produtosRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtosRepository.find();
  }
}
