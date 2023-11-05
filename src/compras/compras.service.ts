import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './compra.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra) private comprasRepository: Repository<Compra>,
  ) {}

  async findAll(): Promise<Compra[]> {
    return await this.comprasRepository.find();
  }

  async findOneById(id: string): Promise<Compra | undefined> {
    return await this.comprasRepository.findOne({ where: { ID: id } });
  }

  async create(compraData: {
    valor: number;
    descricao: string;
    ID_CLIENTE: string;
    ID_PRODUTO: string;
  }): Promise<Compra> {
    const novaCompra = this.comprasRepository.create({
      valor: compraData.valor,
      DESCRICAO: compraData.descricao,
      ID_CLIENTE: compraData.ID_CLIENTE,
      ID_PRODUTO: compraData.ID_PRODUTO,
    });
    return this.comprasRepository.save(novaCompra);
  }
}
