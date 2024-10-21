import { Injectable } from '@nestjs/common';
import { Webtoon } from '../entities/webtoon.entity';
import { WebtoonService } from '../services/webtoon.service';

@Injectable()
export class CreateWebtoonUseCase {
  constructor(private readonly webtoonService: WebtoonService) {}

  async execute(
    webtoonData: Omit<Webtoon, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Webtoon> {
    const newWebtoon = new Webtoon(webtoonData);
    return this.webtoonService.create(newWebtoon);
  }
}
