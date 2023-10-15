// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import { config } from 'dotenv';
// config();
// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     // Obtenha o token JWT do cabeçalho da solicitação
//     const token = req.headers.authorization?.split(' ')[1];

//     if (token) {
//       try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req['partnerId'] = decodedToken['partnerId']; // Adicione o ID do parceiro à solicitação
//         next();
//       } catch (error) {
//         // Token inválido
//         res.status(401).json({ message: 'Token JWT inválido' });
//       }
//     } else {
//       // Token não fornecido
//       res.status(401).json({ message: 'Token JWT não fornecido' });
//     }
//   }
// }
