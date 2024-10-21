import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../../domains/user/entities/user.entity';
import { SqliteUserEntity } from '../entities/sqlite-user.entity';
import { UserRepositoryPort } from 'src/domains/user/ports/driven/user.repository.port';

@Injectable()
export class SqliteUserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(SqliteUserEntity)
    private readonly userRepository: Repository<SqliteUserEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async save(user: User): Promise<User> {
    const userEntity = this.mapToEntity(user);
    const savedEntity = await this.userRepository.save(userEntity);
    return this.mapToDomain(savedEntity);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedEntity = await this.userRepository.findOne({
      where: { id },
    });
    return this.mapToDomain(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private mapToDomain(entity: SqliteUserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private mapToEntity(user: User): SqliteUserEntity {
    const entity = new SqliteUserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.password;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
}
