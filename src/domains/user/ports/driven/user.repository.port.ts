import { User } from '../../entities/user.entity';

export abstract class UserRepositoryPort {
  abstract findById(id: number): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract update(id: number, user: Partial<User>): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
