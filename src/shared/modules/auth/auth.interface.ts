import { User } from 'src/domains/user/models/user.model';
import { TokenType } from './strategies/jwt.strategy';

export interface TokenData {
  payload: Pick<User, 'id' | 'type'>;
  tokenType: TokenType;
}
