import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserType } from 'src/domains/user/models/user.model';

export class UserDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly name: string;
  @Expose()
  @IsEnum(UserType)
  public readonly type: UserType;
  @Expose()
  public readonly email: string;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;
}
