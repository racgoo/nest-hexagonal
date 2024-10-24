import { SetMetadata } from '@nestjs/common';
import { TokenType } from '../modules/auth/strategies/jwt.strategy';

export const JwtTokensType = 'jwtTokenGuard';
export const JwtTokens = (...types: TokenType[]) =>
  SetMetadata(JwtTokensType, types);
