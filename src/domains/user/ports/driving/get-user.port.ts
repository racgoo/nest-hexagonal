import { User } from '../../entities/user.entity';

export interface GetUserPort {
  execute(id: number): Promise<User>;
}
