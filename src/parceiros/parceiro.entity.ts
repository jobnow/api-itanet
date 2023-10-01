import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Produto } from '../produtos/produto.entity';

@Entity('SISTEMA_PARCEIRO')
export class Parceiro {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @OneToMany(() => Produto, (produto) => produto.parceiro)
  produtos: Produto[]; // Crie uma propriedade para os produtos relacionados

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome Fantasia',
  })
  NAME: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Logo' })
  IMG_LOGO: string;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: 'Telefone' })
  TELEFONE: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'CNPJ' })
  CNPJ: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'CEP' })
  CEP: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Estado' })
  ESTADO: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Cidade' })
  CIDADE: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Bairro' })
  BAIRRO: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Endereço' })
  ENDERECO: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Representante',
  })
  REPRESENTANTE: string;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: 'Email' })
  EMAIL: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Telefone Celular',
  })
  TELEFONE_CELULAR: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  SENHA: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Latitude' })
  LATITUDE: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Longitude' })
  LONGITUDE: string | null;

  @Column({
    type: 'char',
    length: 1,
    nullable: true,
    default: 'N',
    comment: 'Delivery?',
  })
  DELIVERY: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Banco' })
  BANCO: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Agência' })
  AGENCIA: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'Conta' })
  CONTA: string | null;

  @Column({ type: 'text', nullable: true, comment: 'Observações da Conta' })
  OBSERVACOES: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Situação do Parceiro',
  })
  SITUACAO: string | null;

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

  @Column({ type: 'char', length: 36, nullable: true, comment: 'Criado Por' })
  UPDATED_BY: string | null;

  @Column({
    type: 'char',
    length: 36,
    nullable: true,
    comment: 'Atualizado Por',
  })
  CREATED_BY: string | null;

  @Column({
    type: 'char',
    length: 1,
    nullable: false,
    default: '0',
    comment: 'Deletado',
  })
  DELETED: string;
}
