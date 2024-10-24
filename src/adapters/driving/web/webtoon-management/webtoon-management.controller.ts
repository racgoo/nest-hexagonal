import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';

import { Webtoon } from '../../../../domains/webtoon/models/webtoon.model';
import { WebtoonManagementService } from './webtoon-management.service';
import {
  RegisterWebtoonRequest,
  RegisterWebtoonResponse,
} from './dto/register-webtoon.dto';
import { ResponseType } from 'src/shared/decorators/response-type.decorator';
import { GetWebtoonRequest, GetWebtoonResponse } from './dto/get-webtoon.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { UserType } from 'src/domains/user/models/user.model';
import { RoleGuard } from 'src/shared/guards/role-auth.guard';

@Controller('webtoon-management')
export class WebtoonManagementController {
  constructor(
    private readonly webtoonManagementService: WebtoonManagementService,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ResponseType(GetWebtoonResponse)
  async getWebtoon(@Param() params: GetWebtoonRequest): Promise<Webtoon> {
    return this.webtoonManagementService.getWebtoonById(params.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ResponseType(RegisterWebtoonResponse)
  async registerWebtoon(
    @Body() webtoonData: RegisterWebtoonRequest,
  ): Promise<Webtoon> {
    return this.webtoonManagementService.registerWebtoon(webtoonData);
  }

  //   @Put(':id')
  //   async updateWebtoon(
  //     @Param('id') id: number,
  //     @Body() webtoon: Partial<Webtoon>,
  //   ): Promise<Webtoon> {
  //     return this.webtoonService.updateWebtoon(id, webtoon);
  //   }

  //   @Delete(':id')
  //   async deleteWebtoon(@Param('id') id: number): Promise<void> {
  //     await this.webtoonService.deleteWebtoon(id);
  //   }
}
