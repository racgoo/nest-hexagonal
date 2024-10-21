import { Exclude, Expose } from 'class-transformer';

export class User {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly name: string;
  @Expose()
  public readonly email: string;
  @Exclude()
  public readonly password: string;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;

  constructor(data: Partial<User> & Pick<User, 'name' | 'email' | 'password'>) {
    Object.assign(this, data);
  }
}
