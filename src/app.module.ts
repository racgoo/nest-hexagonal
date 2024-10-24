import { Module } from '@nestjs/common';
import { SqliteModule } from './adapters/driven/database/sqlite/sqlite.module';
import { UserDomainModule } from './domains/user/user.domain.module';
import { PaymentDomainModule } from './domains/payment/payment.domain.module';
import { WebtoonDomainModule } from './domains/webtoon/webtoon.domain.module';
import { UserManagementModule } from './adapters/driving/web/user-management/user-management.module';
import { WebtoonManagementModule } from './adapters/driving/web/webtoon-management/webtoon-management.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { CryptoModule } from './shared/modules/crypto/crypto.module';
import { PaymentManagementModule } from './adapters/driving/web/payment-management/payment-management.module';

const sharedModules = [AuthModule, CryptoModule];

const adapterModules = [
  SqliteModule,
  UserManagementModule,
  WebtoonManagementModule,
  PaymentManagementModule,
];

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
