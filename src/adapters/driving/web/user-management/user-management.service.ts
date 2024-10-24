import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domains/user/use-cases/create-user.use-case';
import { User, UserType } from 'src/domains/user/models/user.model';
import { AuthService } from 'src/shared/modules/auth/auth.service';
import { GetUserByIdUseCase } from 'src/domains/user/use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from 'src/domains/user/use-cases/get-user-by-email.use-case';
import { CryptoService } from 'src/shared/modules/crypto/crypto.service';
import { Response } from 'express';
import { TokenType } from 'src/shared/modules/auth/strategies/jwt.strategy';
import { UpdateUserUseCase } from 'src/domains/user/use-cases/update-user.use-case';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  async signin({ email, password }: { email: string; password: string }) {
    const user = await this.getUserByEmailUseCase.execute(email);
    this.verifyPassword({ password, user });
    return await this.generateTokens(user);
  }

  async reissueByUserId(userId: number) {
    const user = await this.getUserByIdUseCase.execute(userId);
    return await this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const [access_token, refresh_token] = [
      await this.authService.generateToken({
        payload: user,
        tokenType: TokenType.ACCESS_TOKEN,
      }),
      await this.authService.generateToken({
        payload: user,
        tokenType: TokenType.REFRESH_TOKEN,
      }),
    ];
    return { access_token, refresh_token };
  }

  async register({ email, name, password }: Partial<User>) {
    const hashedPassword = this.hashPassword(password);
    return await this.createUserUseCase.execute({
      email,
      name,
      type: UserType.USER,
      password: hashedPassword,
    });
  }

  async getUserById(id: number) {
    return await this.getUserByIdUseCase.execute(id);
  }

  async saveTest() {
    return await this.createUserUseCase.execute({
      email: 'test@test.com',
      name: 'test',
      type: UserType.USER,
      password: 'test',
    });
  }

  async updateUser({ id, user }: { id: number; user: Partial<User> }) {
    return await this.updateUserUseCase.execute(id, user);
  }

  packageToken({
    res,
    token,
    type,
  }: {
    res: Response;
    token: string;
    type: TokenType;
  }) {
    res.cookie(type, token, {
      httpOnly: true,
      maxAge: 900000,
    });
  }

  private verifyPassword({ password, user }: { password: string; user: User }) {
    if (
      !this.cryptoService.compare({ origin: password, target: user.password })
    ) {
      throw new ForbiddenException();
    }
  }

  private hashPassword(password) {
    return this.cryptoService.hash(password);
  }
}
