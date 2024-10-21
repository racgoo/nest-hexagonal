import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SqliteUserEntity } from './sqlite-user.entity';

@Entity({ name: 'payment' })
export class SqlitePaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => SqliteUserEntity)
  @JoinColumn({ name: 'userId' })
  user: SqliteUserEntity;
}
