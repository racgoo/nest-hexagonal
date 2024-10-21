import { User } from '../../entities/user.entity';

export interface UpdateUserPort {
  execute(id: number, userData: Partial<User>): Promise<User>;
}
