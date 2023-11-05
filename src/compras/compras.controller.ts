import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PagarMe } from 'pagarme';
import { DatabaseService } from '../database/database.service';
import { ComprasService } from './compras.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('compras')
export class ComprasController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly comprasRepository: ComprasService,
  ) {}

  @Post('realizar-pagamento')
  async realizarPagamento(@Body() body: any) {
    try {
      const apiKey = process.env.PAGARME_API_KEY;
      const cartaoData = JSON.parse(body.usuario.CARTAO);

      const transaction = await PagarMe.client
        .connect({ api_key: apiKey })
        .transactions.create({
          amount: body.valor * 100,
          card_number: cartaoData.final,
          card_expiration_date: cartaoData.validade,
          card_holder_name: cartaoData.titular,
          card_cvv: cartaoData.cvc,
        });

      const resultadoTransacao = await this.comprasRepository.create({
        valor: transaction.amount / 100,
        descricao: 'Descrição da transação',
        ID_CLIENTE: '',
        ID_PRODUTO: '',
      });

      return resultadoTransacao;
    } catch (error) {
      throw new HttpException(
        'Erro ao realizar pagamento: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
