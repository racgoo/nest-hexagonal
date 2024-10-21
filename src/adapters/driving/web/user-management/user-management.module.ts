import { Module } from '@nestjs/common';
import { UserDomainModule } from 'src/domains/user/user.domain.module';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';

@Module({
  imports: [UserDomainModule],
  providers: [UserManagementService],
  controllers: [UserManagementController],
})
export class UserManagementModule {}
