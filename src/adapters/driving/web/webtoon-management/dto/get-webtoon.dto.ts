import { IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { WebtoonDto } from './webtoon.dto';

export class GetWebtoonRequest {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}

export class GetWebtoonResponse extends WebtoonDto {}
