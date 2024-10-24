import { Injectable } from '@nestjs/common';
import { UpdateUserPort } from '../ports/driving/update-user.port';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable()
export class UpdateUserUseCase implements UpdateUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number, userData: Partial<User>): Promise<User> {
    return await this.userService.update(id, userData);
  }
}
