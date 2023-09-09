import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token inválido' });
        } else {
          req['clienteId'] = decoded['clienteId'];
          next();
        }
      });
    } else {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
  }
}
