import { Module } from '@nestjs/common';
import { SqliteModule } from 'src/adapters/driven/database/sqlite/sqlite.module';
import { WebtoonRepositoryPort } from './ports/driven/webtoon.repository.port';
import { SqliteWebtoonRepository } from 'src/adapters/driven/database/sqlite/repositories/sqlite-webtoon.repository';
import { CreateWebtoonUseCase } from './use-cases/create-webtoon.use-case';
import { DeleteWebtoonUseCase } from './use-cases/delete-webtoon.use-case';
import { GetWebtoonUseCase } from './use-cases/get-webtoon.use-case';
import { UpdateWebtoonUseCase } from './use-cases/update-webtoon.use-case';
import { WebtoonService } from './services/webtoon.service';

@Module({
  imports: [SqliteModule],
  providers: [
    {
      provide: WebtoonRepositoryPort,
      useExisting: SqliteWebtoonRepository,
    },
    WebtoonService,
    CreateWebtoonUseCase,
    DeleteWebtoonUseCase,
    GetWebtoonUseCase,
    UpdateWebtoonUseCase,
  ],
  exports: [
    CreateWebtoonUseCase,
    DeleteWebtoonUseCase,
    GetWebtoonUseCase,
    UpdateWebtoonUseCase,
  ],
})
export class WebtoonDomainModule {}
