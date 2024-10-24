import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { TokenData } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(tokenData: TokenData) {
    const plain = instanceToPlain(tokenData);
    return this.jwtService.sign(plain);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
