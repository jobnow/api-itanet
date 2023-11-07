import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from 'src/clientes/cliente.entity';
import { Produto } from 'src/produtos/produto.entity';

@Entity('SISTEMA_COMPRA')
export class Compra {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  valor: number;

  @Column()
  descricao: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  ID_CLIENTE: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.compras)
  @JoinColumn({ name: 'ID_CLIENTE', referencedColumnName: 'ID' })
  cliente: Cliente;

  @Column({ type: 'varchar', length: 36, nullable: false })
  ID_PRODUTO: string;

  @ManyToOne(() => Produto, (produto) => produto.compras)
  @JoinColumn({ name: 'ID_PRODUTO', referencedColumnName: 'ID' })
  produto: Produto;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: 'ID da Transação',
  })
  TRANSACTION_ID: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data de Criação',
  })
  DT_CREATED: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Data de Atualização',
  })
  DT_UPDATED: Date;

  @Column({ length: 36, nullable: false, comment: 'Criado Por' })
  UPDATED_BY: string;

  @Column({ length: 36, nullable: true, comment: 'Atualizado Por' })
  CREATED_BY: string;

  @Column({ type: 'char', length: 1, default: '0', comment: 'Deletado' })
  DELETED: string;
}
