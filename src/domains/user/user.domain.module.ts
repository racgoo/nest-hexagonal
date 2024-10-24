import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

import { SqliteModule } from 'src/adapters/driven/database/sqlite/sqlite.module';
import { SqliteUserRepository } from 'src/adapters/driven/database/sqlite/repositories/sqlite-user.repository';
import { UserRepositoryPort } from './ports/driven/user.repository.port';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';

@Module({
  imports: [SqliteModule],
  providers: [
    {
      provide: UserRepositoryPort,
      useExisting: SqliteUserRepository,
    },
    UserService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserDomainModule {}
