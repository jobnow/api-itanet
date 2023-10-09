import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
import { ParceirosService } from '../parceiros/parceiros.service';

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly parceirosService: ParceirosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const parceiro = await this.parceirosService.findOneById(
      payload.parceiroId,
    );

    if (!parceiro) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    return parceiro;
  }
}
