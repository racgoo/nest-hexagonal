import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserManagementService } from './user-management.service';

@Controller('user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}
  @Get('/:id')
  async getUser(@Param('id') strId: string) {
    const user = await this.userManagementService.getUserById(parseInt(strId));
    console.log(user);
    return user;
  }

  @Post()
  async register(
    @Body() params: { email: string; name: string; password: string },
  ) {
    return this.userManagementService.register(params);
  }
}
