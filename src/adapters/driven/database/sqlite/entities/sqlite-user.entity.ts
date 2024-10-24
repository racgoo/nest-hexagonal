import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SqlitePaymentEntity } from './sqlite-payment.entity';
import { SqliteWebtoonEntity } from './sqlite-webtoon.entity';
import { User, UserType } from 'src/domains/user/models/user.model';

export enum UserRelations {
  WEBTOONS = 'webtoons',
  PAYMENTS = 'payments',
}

@Entity({ name: 'user' })
export class SqliteUserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  type: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => SqliteWebtoonEntity, (webtoon) => webtoon.author)
  @JoinColumn({ name: 'author_id' })
  webtoons: SqliteWebtoonEntity[];
  @OneToMany(() => SqlitePaymentEntity, (payment) => payment.user)
  payments: SqlitePaymentEntity[];

  static toDomain(userEntity: SqliteUserEntity): User {
    return new User({
      id: userEntity?.id,
      name: userEntity?.name,
      email: userEntity?.email,
      password: userEntity?.password,
      type: userEntity?.type as UserType,
      createdAt: userEntity?.createdAt,
      updatedAt: userEntity?.updatedAt,
    });
  }

  static toEntity(user: User): SqliteUserEntity {
    const entity = new SqliteUserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.password;
    entity.type = user.type;
    return entity;
  }
}
