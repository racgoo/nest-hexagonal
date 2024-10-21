import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SqlitePaymentEntity } from './sqlite-payment.entity';
import { SqliteWebtoonEntity } from './sqlite-webtoon.entity';

@Entity({ name: 'user' })
export class SqliteUserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => SqliteWebtoonEntity, (webtoon) => webtoon.author)
  webtoons: SqliteWebtoonEntity[];
  @OneToMany(() => SqlitePaymentEntity, (payment) => payment.user)
  payments: SqlitePaymentEntity[];
}
