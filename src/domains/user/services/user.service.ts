import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepositoryPort } from '../ports/driven/user.repository.port';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
