import { Injectable } from '@nestjs/common';
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ITANET',
      connectionLimit: 10,
    });
  }

  async query(sql: string, values?: any[]): Promise<RowDataPacket[]> {
    const [rows] = await this.pool.execute(sql, values);
    return rows as RowDataPacket[];
  }
}
