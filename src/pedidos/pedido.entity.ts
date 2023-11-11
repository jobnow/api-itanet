import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';

@Entity('PEDIDOS')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'char', length: 36, nullable: false })
  ID_CLIENTE: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @Column({ type: 'char', length: 1, nullable: false })
  STATUS: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  VALOR: number;

  @Column({ type: 'int', nullable: false })
  status_pedido: number;

  @Column({ type: 'int', nullable: false })
  ITACOINS: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  CODIGO: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  DT_CREATED: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  DT_UPDATED: Date;

  @Column({ type: 'char', length: 36, nullable: false })
  UPDATED_BY: string;

  @Column({ type: 'char', length: 36, nullable: false })
  CREATED_BY: string;

  @Column({ type: 'char', length: 1, default: '0', nullable: false })
  DELETED: string;

  @Column({ type: 'int', nullable: false })
  FORMA_PAGAMENTO: number;
}
