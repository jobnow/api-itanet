import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './compra.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private comprasRepository: Repository<Compra>,
  ) {}

  async create(compra: Partial<Compra>): Promise<Compra> {
    const novaCompra = this.comprasRepository.create(compra);
    return this.comprasRepository.save(novaCompra);
  }
}
