import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { GetUserByEmailPort } from '../ports/driving/get-user-by-email.port';

@Injectable()
export class GetUserByEmailUseCase implements GetUserByEmailPort {
  constructor(private readonly userService: UserService) {}

  async execute(email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }
}
