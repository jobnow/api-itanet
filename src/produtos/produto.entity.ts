import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Parceiro } from '../parceiros/parceiro.entity';

@Entity('SISTEMA_VANTAGEM')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  ID_PARCEIRO: string;

  @ManyToOne(() => Parceiro, (parceiro) => parceiro.produtos)
  @JoinColumn({ name: 'ID_PARCEIRO', referencedColumnName: 'ID' })
  parceiro: Parceiro;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: 'Nome' })
  NAME: string;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: 'Chamada' })
  CHAMADA: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Descrição',
  })
  DESCRICAO: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: 'Valor',
  })
  VALOR: number;

  @Column({
    type: 'varchar',
    length: 2,
    nullable: false,
    comment: 'Desconto (%)',
  })
  DESCONTO: string;

  @Column({ type: 'date', nullable: false, comment: 'Validade' })
  DT_VALIDADE: Date;

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

// @Entity('VANTAGEM_IMAGENS')
// export class Imagem {
//   @PrimaryGeneratedColumn('uuid')
//   ID: string;
//   @Column({ type: 'varchar', length: 36, nullable: false })
//   VANTAGEM_ID: string;
//   @Column({ type: 'varchar', length: 225, nullable: false })
//   IMG_FOTO: string;
// }
