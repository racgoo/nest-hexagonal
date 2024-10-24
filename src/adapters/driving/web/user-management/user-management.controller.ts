import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';
import { GetUserRequset, GetUserResponse } from './dto/get-user.dto';
import { ResponseType } from 'src/shared/decorators/response-type.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { SigninRequest, SigninResponse } from './dto/signin.dto';
import { Response } from 'express';
import { RoleGuard } from 'src/shared/guards/role-auth.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { UserType } from 'src/domains/user/models/user.model';
import { TokenType } from 'src/shared/modules/auth/strategies/jwt.strategy';
import { ReissueRequest, ReissueResponse } from './dto/reissue.dto';
import { JwtTokens } from 'src/shared/decorators/jwt-token.decorator.guard';
import { GetTokenData } from 'src/shared/decorators/get-user.decorator';
import { TokenData } from 'src/shared/modules/auth/auth.interface';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
// import { JwtTokens } from 'src/shared/decorators/jwt-token.decorator.guard';

@Controller('user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ResponseType(SigninResponse)
  async signin(
    @Body() body: SigninRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.userManagementService.signin(body);
    this.userManagementService.packageToken({
      res,
      token: access_token,
      type: TokenType.ACCESS_TOKEN,
    });
    return res.send({ refresh_token });
  }

  @Get('reissue')
  @UseGuards(JwtAuthGuard)
  @JwtTokens(TokenType.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  @ResponseType(ReissueResponse)
  async signInByRefreshToken(
    @Body() body: ReissueRequest,
    @Res() res: Response,
    @GetTokenData() tokenData: TokenData,
  ) {
    const { access_token, refresh_token } =
      await this.userManagementService.reissueByUserId(tokenData.payload.id);
    this.userManagementService.packageToken({
      res,
      token: access_token,
      type: TokenType.ACCESS_TOKEN,
    });
    return res.send({ refresh_token });
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ResponseType(RegisterResponse)
  async register(@Body() body: RegisterRequest) {
    return await this.userManagementService.register(body);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.USER, UserType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ResponseType(GetUserResponse)
  async getUser(@Param() params: GetUserRequset) {
    return await this.userManagementService.getUserById(params.id);
  }

  @Put('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.USER)
  @ResponseType(UpdateUserResponse)
  async updateUser(
    @Body() body: UpdateUserRequest,
    @GetTokenData() tokenData: TokenData,
  ) {
    return await this.userManagementService.updateUser({
      id: tokenData.payload.id,
      user: body,
    });
  }

  @Get('user-test')
  @ResponseType({})
  async test() {
    const user = await this.userManagementService.getUserById(1);
    await this.userManagementService;
    console.log(user);
    return;
  }
}
