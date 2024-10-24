import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebtoonRepositoryPort } from '../../../../../domains/webtoon/ports/driven/webtoon.repository.port';
import { Webtoon } from '../../../../../domains/webtoon/models/webtoon.model';
import { SqliteWebtoonEntity } from '../entities/sqlite-webtoon.entity';

@Injectable()
export class SqliteWebtoonRepository implements WebtoonRepositoryPort {
  constructor(
    @InjectRepository(SqliteWebtoonEntity)
    private readonly webtoonRepository: Repository<SqliteWebtoonEntity>,
  ) {}

  async findById(id: number): Promise<Webtoon | null> {
    const webtoonEntity = await this.webtoonRepository.findOne({
      where: { id },
    });
    return webtoonEntity ? this.mapToDomain(webtoonEntity) : null;
  }

  async save(webtoon: Webtoon): Promise<Webtoon> {
    const webtoonEntity = this.mapToEntity(webtoon);
    const savedEntity = await this.webtoonRepository.save(webtoonEntity);
    return this.mapToDomain(savedEntity);
  }

  async update(id: number, webtoon: Partial<Webtoon>): Promise<Webtoon> {
    await this.webtoonRepository.update(id, webtoon);
    const updatedEntity = await this.webtoonRepository.findOne({
      where: { id },
    });

    return this.mapToDomain(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.webtoonRepository.delete(id);
  }

  private mapToDomain(entity: SqliteWebtoonEntity): Webtoon {
    return new Webtoon({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      image: entity.image,
      authorId: entity.authorId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private mapToEntity(webtoon: Webtoon): SqliteWebtoonEntity {
    const entity = new SqliteWebtoonEntity();
    entity.id = webtoon.id;
    entity.title = webtoon.title;
    entity.description = webtoon.description;
    entity.image = webtoon.image;
    entity.authorId = webtoon.authorId;
    entity.createdAt = webtoon.createdAt;
    entity.updatedAt = webtoon.updatedAt;
    return entity;
  }
}
