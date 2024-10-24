import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { UserDto } from './user.dto';

export class GetUserRequset {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class GetUserResponse extends UserDto {}
