import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterResponse extends UserDto {}
