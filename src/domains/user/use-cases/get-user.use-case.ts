import { Injectable } from '@nestjs/common';
import { GetUserPort } from '../ports/driving/get-user.port';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class GetUserUseCase implements GetUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number): Promise<User> {
    return await this.userService.findById(id);
  }
}
