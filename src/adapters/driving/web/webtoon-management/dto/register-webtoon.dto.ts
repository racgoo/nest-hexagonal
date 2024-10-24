import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { WebtoonDto } from './webtoon.dto';

export class RegisterWebtoonRequest {
  @Expose()
  @IsString()
  public readonly title: string;

  @Expose()
  @IsString()
  public readonly description: string;

  @Expose()
  @IsString()
  public readonly image: string;

  @Expose()
  @IsNumber()
  public readonly authorId: number;
}

export class RegisterWebtoonResponse extends WebtoonDto {}
