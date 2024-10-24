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
import { Webtoon } from 'src/domains/webtoon/models/webtoon.model';

export enum WebtoonRelations {
  AUTHOR = 'author',
}

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

  static toDomain(webtoonEntity: SqliteWebtoonEntity): Webtoon {
    return new Webtoon({
      id: webtoonEntity?.id,
      title: webtoonEntity?.title,
      description: webtoonEntity?.description,
      image: webtoonEntity?.image,
      authorId: webtoonEntity?.authorId,
      createdAt: webtoonEntity?.createdAt,
      updatedAt: webtoonEntity?.updatedAt,
    });
  }

  static toEntity(webtoon: Webtoon): SqliteWebtoonEntity {
    const entity = new SqliteWebtoonEntity();
    entity.id = webtoon?.id;
    entity.title = webtoon?.title;
    entity.description = webtoon?.description;
    entity.image = webtoon?.image;
    entity.authorId = webtoon?.authorId;
    return entity;
  }
}
