import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Troque isso pela sua chave secreta real
      signOptions: { expiresIn: '1h' }, // Defina a expiração do token conforme necessário
    }),
  ],
})
export class AuthModule {}
