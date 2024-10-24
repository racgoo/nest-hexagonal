import { User } from '../../models/user.model';

export abstract class UserRepositoryPort {
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract update(id: number, user: Partial<User>): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
