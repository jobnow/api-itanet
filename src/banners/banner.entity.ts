import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SISTEMA_BANNER')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ length: 255 })
  NAME: string;

  @Column({ length: 255 })
  IMG_BANNER: string;

  @Column({ length: 255 })
  LINK_BANNER: string;

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
