import { Module } from '@nestjs/common';
import { WebtoonDomainModule } from 'src/domains/webtoon/webtoon.domain.module';
import { WebtoonManagementService } from './webtoon-management.service';
import { WebtoonManagementController } from './webtoon-management.controller';

@Module({
  imports: [WebtoonDomainModule],
  controllers: [WebtoonManagementController],
  providers: [WebtoonManagementService],
})
export class WebtoonManagementModule {}
