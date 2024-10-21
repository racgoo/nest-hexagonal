import { Expose } from 'class-transformer';

export class Webtoon {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly title: string;
  @Expose()
  public readonly description: string;
  @Expose()
  public readonly image: string;
  @Expose()
  public readonly authorId: number;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;

  constructor(
    data: Partial<Webtoon> &
      Pick<Webtoon, 'title' | 'description' | 'image' | 'authorId'>,
  ) {
    Object.assign(this, data);
  }
}
