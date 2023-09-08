import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parceiro } from './parceiro.entity';
import { isMobilePhone } from 'class-validator';

@Injectable()
export class ParceiroValidator {
  constructor(
    @InjectRepository(Parceiro)
    private readonly parceiroRepository: Repository<Parceiro>,
  ) {}

  async validate(parceiroData: Partial<Parceiro>): Promise<string[]> {
    const errors: string[] = [];

    if (!parceiroData.NAME || parceiroData.NAME.trim() === '') {
      errors.push('O campo Nome Fantasia é obrigatório.');
    }

    if (!parceiroData.IMG_LOGO || parceiroData.IMG_LOGO.trim() === '') {
      errors.push('O campo Logo é obrigatório.');
    }

    if (!parceiroData.TELEFONE || parceiroData.TELEFONE.trim() === '') {
      errors.push('O campo Telefone é obrigatório.');
    } else if (!isMobilePhone(parceiroData.TELEFONE, 'pt-BR')) {
      errors.push('O campo Telefone deve ser um número de telefone válido.');
    }

    if (!parceiroData.CNPJ || parceiroData.CNPJ.trim() === '') {
      errors.push('O campo CNPJ é obrigatório.');
    }

    if (!parceiroData.CEP || parceiroData.CEP.trim() === '') {
      errors.push('O campo CEP é obrigatório.');
    }

    if (!parceiroData.ESTADO || parceiroData.ESTADO.trim() === '') {
      errors.push('O campo Estado é obrigatório.');
    }

    if (!parceiroData.CIDADE || parceiroData.CIDADE.trim() === '') {
      errors.push('O campo Cidade é obrigatório.');
    }

    if (!parceiroData.BAIRRO || parceiroData.BAIRRO.trim() === '') {
      errors.push('O campo Bairro é obrigatório.');
    }

    if (!parceiroData.ENDERECO || parceiroData.ENDERECO.trim() === '') {
      errors.push('O campo Endereço é obrigatório.');
    }

    if (
      !parceiroData.REPRESENTANTE ||
      parceiroData.REPRESENTANTE.trim() === ''
    ) {
      errors.push('O campo Representante é obrigatório.');
    }

    if (!parceiroData.EMAIL || parceiroData.EMAIL.trim() === '') {
      errors.push('O campo Email é obrigatório.');
    }
    if (
      !parceiroData.TELEFONE_CELULAR ||
      parceiroData.TELEFONE_CELULAR.trim() === ''
    ) {
      errors.push('O campo Telefone Celular é obrigatório.');
    } else if (!isMobilePhone(parceiroData.TELEFONE_CELULAR, 'pt-BR')) {
      errors.push(
        'O campo Telefone Celular deve ser um número de telefone válido.',
      );
    }

    if (!parceiroData.SENHA || parceiroData.SENHA.trim() === '') {
      errors.push('O campo Senha é obrigatório.');
    }

    if (parceiroData.LATITUDE && isNaN(parseFloat(parceiroData.LATITUDE))) {
      errors.push('O campo Latitude deve ser um número válido.');
    }

    if (parceiroData.LONGITUDE && isNaN(parseFloat(parceiroData.LONGITUDE))) {
      errors.push('O campo Longitude deve ser um número válido.');
    }

    if (parceiroData.DELIVERY !== 'S' && parceiroData.DELIVERY !== 'N') {
      errors.push('O campo Delivery deve ser "S" ou "N".');
    }

    if (parceiroData.BANCO && parceiroData.BANCO.length > 50) {
      errors.push('O campo Banco deve ter no máximo 50 caracteres.');
    }

    if (parceiroData.AGENCIA && parceiroData.AGENCIA.length > 50) {
      errors.push('O campo Agência deve ter no máximo 50 caracteres.');
    }

    if (parceiroData.CONTA && parceiroData.CONTA.length > 50) {
      errors.push('O campo Conta deve ter no máximo 50 caracteres.');
    }

    if (parceiroData.OBSERVACOES && parceiroData.OBSERVACOES.length > 255) {
      errors.push('O campo Observações deve ter no máximo 255 caracteres.');
    }

    if (parceiroData.SITUACAO && parceiroData.SITUACAO.length > 50) {
      errors.push(
        'O campo Situação do Parceiro deve ter no máximo 50 caracteres.',
      );
    }

    return errors;
  }
}
