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

@Entity({ name: 'webtoon' })
export class SqliteWebtoonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  authorId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => SqliteUserEntity)
  @JoinColumn({ name: 'authorId' })
  author: SqliteUserEntity;
}
