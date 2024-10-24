import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteUserEntity } from './entities/sqlite-user.entity';
import { SqliteWebtoonEntity } from './entities/sqlite-webtoon.entity';
import { SqlitePaymentEntity } from './entities/sqlite-payment.entity';

import { SqliteWebtoonRepository } from './repositories/sqlite-webtoon.repository';
import { SqliteUserRepository } from './repositories/sqlite-user.repository';
import { SqlitePaymentRepository } from './repositories/sqlite-payment.repository';
import { SqlitePaymentItemEntity } from './entities/sqlite-payment-item.entity';
import { SqlitePaymentItemRepository } from './repositories/sqlite-payment-item.repository';

const entities = [
  SqliteUserEntity,
  SqliteWebtoonEntity,
  SqlitePaymentEntity,
  SqlitePaymentItemEntity,
];

const repositories = [
  SqliteUserRepository,
  SqliteWebtoonRepository,
  SqlitePaymentRepository,
  SqlitePaymentItemRepository,
];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...repositories],
  exports: [...repositories],
})
export class SqliteModule {}
