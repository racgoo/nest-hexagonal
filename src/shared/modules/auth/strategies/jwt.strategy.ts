import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { TokenData } from '../auth.interface';
import { Reflector } from '@nestjs/core';
import { JwtTokensType } from 'src/shared/decorators/jwt-token.decorator.guard';

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return (
            ExtractJwt.fromAuthHeaderAsBearerToken()(request) ||
            request.cookies[TokenType.ACCESS_TOKEN]
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
      passReqToCallback: true,
    });
  }

  async validate(request: any, tokenData: TokenData) {
    const handler = request.route.stack[request.route.stack.length - 1].handle;
    const allowedTokenTypes = this.reflector.get<TokenType[]>(
      JwtTokensType,
      handler,
    ) || [TokenType.ACCESS_TOKEN];
    if (!allowedTokenTypes.includes(tokenData.tokenType)) {
      throw new UnauthorizedException(
        '이 엔드포인트에 대해 허용되지 않은 토큰 타입입니다.',
      );
    }

    return tokenData;
  }
}
