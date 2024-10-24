import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../../domains/user/models/user.model';
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
    return userEntity ? SqliteUserEntity.toDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });
    return userEntity ? SqliteUserEntity.toDomain(userEntity) : null;
  }

  async save(user: User): Promise<User> {
    const userEntity = SqliteUserEntity.toEntity(user);
    const savedEntity = await this.userRepository.save(userEntity);
    return SqliteUserEntity.toDomain(savedEntity);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedEntity = await this.userRepository.findOne({
      where: { id },
    });
    return updatedEntity ? SqliteUserEntity.toDomain(updatedEntity) : null;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
