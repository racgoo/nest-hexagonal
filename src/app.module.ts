import { Module } from '@nestjs/common';
import { SqliteModule } from './adapters/driven/database/sqlite/sqlite.module';
import { UserDomainModule } from './domains/user/user.domain.module';
import { PaymentDomainModule } from './domains/payment/payment.domain.module';
import { WebtoonDomainModule } from './domains/webtoon/webtoon.domain.module';
import { UserManagementModule } from './adapters/driving/web/user-management/user-management.module';

const sharedModules = [];
const adapterModules = [SqliteModule, UserManagementModule];
const domainModules = [
  UserDomainModule,
  PaymentDomainModule,
  WebtoonDomainModule,
];

@Module({
  imports: [...domainModules, ...adapterModules, ...sharedModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
