import { Compra } from 'src/compras/compra.entity';
import { Pedido } from 'src/pedidos/pedido.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('SISTEMA_CLIENTE')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ length: 255 })
  NAME: string;

  @Column({ length: 255 })
  EMAIL: string;

  @Column({ length: 255 })
  SENHA: string;

  @OneToMany(() => Compra, (compra) => compra.produto)
  compras: Compra[];

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @Column({ type: 'date', nullable: true })
  DT_NASCIMENTO: Date;

  @Column({ length: 255, nullable: true })
  CPF: string;

  @Column({ length: 255, nullable: true })
  TELEFONE: string;

  @Column('text', { nullable: true })
  ENDERECO: string;

  @Column('text', { nullable: true })
  CARTAO: string;

  @Column({ length: 255, nullable: true })
  ITACOINS: string;

  @Column({ length: 255, nullable: true })
  PAGAMENTO: string;

  @CreateDateColumn({ type: 'datetime', name: 'DT_CREATED' })
  DT_CREATED: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'DT_UPDATED' })
  DT_UPDATED: Date;

  @Column({ length: 36, nullable: true, name: 'UPDATED_BY' })
  UPDATED_BY: string;

  @Column({ length: 36, nullable: true, name: 'CREATED_BY' })
  CREATED_BY: string;

  @Column({ length: 1, default: '0', name: 'DELETED' })
  DELETED: string;
}
