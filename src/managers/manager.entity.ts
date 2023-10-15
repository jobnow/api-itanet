import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('MANAGER_USER')
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  NAME: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  EMAIL: string;

  @Column({ type: 'char', length: 50, nullable: false })
  LOGIN: string;

  @Column({ type: 'char', length: 100, nullable: false })
  PASSWORD: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PROFILE_IMAGE: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  OCCUPATION: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  COMMENTS: string;

  @Column({ type: 'char', length: 1, default: '0' })
  ADMIN: string;

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
