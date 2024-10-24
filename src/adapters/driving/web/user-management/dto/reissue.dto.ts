import { IsNotEmpty, IsString } from 'class-validator';

export class ReissueRequest {}

export class ReissueResponse {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
