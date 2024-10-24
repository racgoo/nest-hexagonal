import { Injectable } from '@nestjs/common';
import { GetUserByIdPort } from '../ports/driving/get-user-by-id.port';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number): Promise<User> {
    return await this.userService.findById(id);
  }
}
