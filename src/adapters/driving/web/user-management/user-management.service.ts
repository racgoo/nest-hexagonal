import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domains/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/domains/user/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/domains/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/domains/user/use-cases/update-user.use-case';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}
  async getUserById(id: number) {
    return await this.getUserUseCase.execute(id);
  }

  async register({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    await this.createUserUseCase.execute({ email, name, password });
  }
}
