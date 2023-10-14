import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SISTEMA_TAXA')
export class Taxa {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  TAXA_VENDA: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  TAXA_CARTAO: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  TAXA_BOLETO: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  PORCENTUAL_ITACOINS: string;

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
