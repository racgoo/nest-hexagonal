import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteUserEntity } from './entities/sqlite-user.entity';
import { SqliteWebtoonEntity } from './entities/sqlite-webtoon.entity';
import { SqlitePaymentEntity } from './entities/sqlite-payment.entity';

import { SqliteWebtoonRepository } from './repositories/sqlite-webtoon.repository';
import { SqliteUserRepository } from './repositories/sqlite-user.repository';
import { SqlitePaymentRepository } from './repositories/sqlite-payment.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [SqliteUserEntity, SqliteWebtoonEntity, SqlitePaymentEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      SqliteUserEntity,
      SqliteWebtoonEntity,
      SqlitePaymentEntity,
    ]),
  ],
  providers: [
    SqliteUserRepository,
    SqliteWebtoonRepository,
    SqlitePaymentRepository,
  ],
  exports: [
    SqliteUserRepository,
    SqliteWebtoonRepository,
    SqlitePaymentRepository,
  ],
})
export class SqliteModule {}
