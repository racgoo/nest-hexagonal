import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class WebtoonDto {
  @Expose()
  @IsNumber()
  public readonly id: number;
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
  @Expose()
  @IsDate()
  public readonly createdAt: Date;
  @Expose()
  @IsDate()
  public readonly updatedAt: Date;
}
