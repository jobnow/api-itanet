import { Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { Manager } from './manager.entity';

@Injectable()
export class ManagerValidator {
  async validate(managerUserData: Partial<Manager>): Promise<string[]> {
    const errors: string[] = [];

    if (!managerUserData.NAME || managerUserData.NAME.trim() === '') {
      errors.push('O campo Nome é obrigatório.');
    }

    if (managerUserData.EMAIL && !isEmail(managerUserData.EMAIL)) {
      errors.push('O campo Email deve ser um endereço de e-mail válido.');
    }

    if (!managerUserData.LOGIN || managerUserData.LOGIN.trim() === '') {
      errors.push('O campo Login é obrigatório.');
    }

    if (!managerUserData.PASSWORD || managerUserData.PASSWORD.trim() === '') {
      errors.push('O campo Senha é obrigatório.');
    }

    return errors;
  }
}
