import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DeleteUserPort } from '../ports/driving/delete-user.port';

@Injectable()
export class DeleteUserUseCase implements DeleteUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number) {
    await this.userService.delete(id);
  }
}
