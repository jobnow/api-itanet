import { Cliente } from 'src/clientes/cliente.entity';
import { Produto } from 'src/produtos/produto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('SISTEMA_COMPRA')
export class Compra {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  valor: number;

  @Column()
  DESCRICAO: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  ID_CLIENTE: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.compras)
  @JoinColumn({ name: 'ID_CLIENTE', referencedColumnName: 'ID' })
  clientes: Cliente;

  @Column({ type: 'varchar', length: 36, nullable: false })
  ID_PRODUTO: string;

  @ManyToOne(() => Produto, (produto) => produto.compras)
  @JoinColumn({ name: 'ID_PRODUTO', referencedColumnName: 'ID' })
  produtos: Produto;

  @Column({ length: 36, nullable: false, comment: 'Criado Por' })
  UPDATED_BY: string;

  @Column({ length: 36, nullable: true, comment: 'Atualizado Por' })
  CREATED_BY: string;

  @Column({ type: 'char', length: 1, default: '0', comment: 'Deletado' })
  DELETED: string;
}
