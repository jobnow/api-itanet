import { ProdutosService } from './../produtos/produtos.service';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import * as pagarme from 'pagarme';
import { DatabaseService } from '../database/database.service';
import { ComprasService } from './compras.service';
import { ClientesService } from '../clientes/clientes.service';
import { config } from 'dotenv';
config();
@Controller('compras')
export class ComprasController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly comprasRepository: ComprasService,
    private readonly clientesService: ClientesService,
    private readonly produtosService: ProdutosService,
  ) {}

  @Post('realizar-pagamento')
  async realizarPagamento(@Body() body: any, @Request() request: any) {
    const apiKey = process.env.PAGARME_API_KEY;
    try {
      const clienteId = request.clienteId;

      const cliente = await this.clientesService.findOneById(clienteId);

      if (!cliente) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }

      // Acesse os detalhes do cartão do cliente
      // Os dados do cartão do cliente registrado são feitos em raw
      const cartaoData = JSON.parse(cliente.CARTAO);

      // Obtenha o ID do produto a partir do corpo da solicitação
      const produtoId = body.produtoId;

      // Acesse os detalhes do produto para obter o ID do parceiro (vendedor)
      const produto = await this.produtosService.findOneById(produtoId);

      if (!produto) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }

      // Obtenha o ID do parceiro (vendedor) associado ao produto
      // Posso fazer isso no front end
      const parceiroId = produto.ID_PARCEIRO;

      // Com base no ID do parceiro, você pode configurar o pagamento dividido (split) para o vendedor
      const recebedorVendedor = {
        recipient_id: parceiroId,
        amount: body.valor * 100, // Define a porcentagem apropriada se necessário
      };

      const pagarMe = pagarme;
      const client = pagarMe.client;

      const transaction = await client
        .connect({ api_key: apiKey })
        .transactions.create({
          amount: body.valor * 100,
          card_number: cartaoData.final,
          card_expiration_date: cartaoData.validade,
          card_holder_name: cartaoData.titular,
          card_cvv: cartaoData.cvc,
          split_rules: [recebedorVendedor], // Define as regras de divisão
        });

      // Salve o resultado da transação no banco de dados
      const compra = await this.comprasRepository.create({
        valor: transaction.amount / 100,
        descricao: 'Compra realizada',
        ID_CLIENTE: clienteId,
        ID_PRODUTO: produtoId,
        TRANSACTION_ID: transaction.id,
      });

      return compra;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro do Pagar.me:', error);
        throw new HttpException(
          'Erro do Pagar.me: ' + error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.error('Erro ao realizar pagamento:', error);
        throw new HttpException(
          'Erro ao realizar pagamento',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
