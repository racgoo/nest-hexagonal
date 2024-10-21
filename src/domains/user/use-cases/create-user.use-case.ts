import { Injectable } from '@nestjs/common';
import { CreateUserPort } from '../ports/driving/create-user.port';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const newUser = new User(userData);
    return this.userService.create(newUser);
  }
}
