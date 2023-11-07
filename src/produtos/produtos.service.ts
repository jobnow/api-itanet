import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto) private produtosRepository: Repository<Produto>,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(produto: Produto): Promise<Produto> {
    return await this.produtosRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtosRepository.find();
  }

  async findOneById(id: string): Promise<Produto | undefined> {
    return this.produtosRepository.findOne({ where: { ID: id } });
  }

  async listarHome() {
    try {
      const vantagemRows = await this.databaseService.query(
        'SELECT * FROM SISTEMA_VANTAGEM',
      );

      const result = [];

      for (const vantagem of vantagemRows) {
        const parceiroRows = await this.databaseService.query(
          'SELECT * FROM SISTEMA_PARCEIRO WHERE ID = ?',
          [vantagem.ID_PARCEIRO],
        );
        const imagensRows = await this.databaseService.query(
          'SELECT * FROM VANTAGEM_IMAGENS WHERE VANTAGEM_ID = ?',
          [vantagem.ID],
        );

        vantagem.Parceiro = parceiroRows[0];
        vantagem.Imagens = imagensRows;
        result.push(vantagem);
      }

      return { data: result };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async listarDelivery() {
    try {
      const parceiroRows = await this.databaseService.query(
        'SELECT * FROM SISTEMA_PARCEIRO WHERE DELIVERY = "S"',
      );
      const result = [];

      for (const parceiro of parceiroRows) {
        const vantagensRows = await this.databaseService.query(
          'SELECT * FROM SISTEMA_VANTAGEM WHERE ID_PARCEIRO = ?',
          [parceiro.ID],
        );
        const vantagensComImagens = [];

        for (const vantagem of vantagensRows) {
          const imagensRows = await this.databaseService.query(
            'SELECT * FROM VANTAGEM_IMAGENS WHERE VANTAGEM_ID = ?',
            [vantagem.ID],
          );
          vantagem.Imagens = imagensRows;
          vantagensComImagens.push(vantagem);
        }

        parceiro.Vantagens = vantagensComImagens;
        result.push(parceiro);
      }

      return { data: result };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async listarCategoria() {
    try {
      const vantagemRows = await this.databaseService.query(
        'SELECT * FROM SISTEMA_VANTAGEM',
      );

      const result = [];

      for (const vantagem of vantagemRows) {
        const categoriaRows = await this.databaseService.query(
          'SELECT * FROM SISTEMA_CATEGORIA WHERE ID = ?',
          [vantagem.ID_CATEGORIA],
        );

        vantagem.Categoria = categoriaRows[0];
        result.push(vantagem);
      }

      return { data: result };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // async getProductById(id: string): Promise<Produto | undefined> {
  //   return await this.produtosRepository.findOne({ where: { ID: id } });
  // }

  async getProductById(id: string) {
    try {
      const [vantagemRows] = await this.databaseService.query(
        'SELECT * FROM SISTEMA_VANTAGEM WHERE ID = ?',
        [id],
      );

      const vantagem = vantagemRows;

      const [parceiroRows] = await this.databaseService.query(
        'SELECT * FROM SISTEMA_PARCEIRO WHERE ID = ?',
        [vantagem.ID_PARCEIRO],
      );

      const imagensRows = await this.databaseService.query(
        'SELECT * FROM VANTAGEM_IMAGENS WHERE VANTAGEM_ID = ?',
        [vantagem.ID],
      );

      const imagens = [];

      for (const imagemRow of imagensRows) {
        imagens.push(imagemRow);
      }

      vantagem.Imagens = imagens;
      vantagem.Parceiro = parceiroRows;

      return vantagem;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
