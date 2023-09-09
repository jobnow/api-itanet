import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { isDate, isMobilePhone, isCreditCard } from 'class-validator';

@Injectable()
export class ClienteValidator {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async validate(clienteData: Partial<Cliente>): Promise<string[]> {
    const errors: string[] = [];

    if (!clienteData.NAME || clienteData.NAME.trim() === '') {
      errors.push('O campo de nome é obrigatório.');
    }

    if (!clienteData.EMAIL || clienteData.EMAIL.trim() === '') {
      errors.push('O campo de email é obrigatório.');
    } else {
      const existingCliente = await this.clienteRepository.findOne({
        where: { EMAIL: clienteData.EMAIL },
      });
      if (existingCliente) {
        errors.push('O e-mail fornecido já está em uso.');
      }
    }

    if (!clienteData.SENHA || clienteData.SENHA.trim() === '') {
      errors.push('O campo "SENHA" é obrigatório.');
    }

    if (
      !clienteData.DT_NASCIMENTO ||
      !isDate(new Date(clienteData.DT_NASCIMENTO))
    ) {
      errors.push(
        'Informar a data de nascimento é obrigatório e deve ser uma data válida (YYYY-MM-DD).',
      );
    }

    if (
      !clienteData.CPF ||
      !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(clienteData.CPF)
    ) {
      errors.push(
        'O campo CPF é obrigatório e deve estar no formato 123.456.789-00.',
      );
    }

    if (
      !clienteData.TELEFONE ||
      !isMobilePhone(clienteData.TELEFONE, 'pt-BR')
    ) {
      errors.push(
        'O campo Telefone é obrigatório e deve ser um número de telefone válido.',
      );
    }

    if (!clienteData.ENDERECO || clienteData.ENDERECO.trim() === '') {
      errors.push('O campo Endereço é obrigatório.');
    }

    if (!clienteData.CARTAO || !isCreditCard(clienteData.CARTAO)) {
      errors.push(
        'O campo Cartão é obrigatório e deve ser um número de cartão de crédito válido.',
      );
    }

    return errors;
  }
}
