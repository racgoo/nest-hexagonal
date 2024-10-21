import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

import { SqliteModule } from 'src/adapters/driven/database/sqlite/sqlite.module';
import { SqliteUserRepository } from 'src/adapters/driven/database/sqlite/repositories/sqlite-user.repository';
import { UserRepositoryPort } from './ports/driven/user.repository.port';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Module({
  imports: [SqliteModule],
  providers: [
    {
      provide: UserRepositoryPort,
      useExisting: SqliteUserRepository,
    },
    UserService,
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserDomainModule {}
