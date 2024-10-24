import { Injectable } from '@nestjs/common';
import { Webtoon } from '../models/webtoon.model';
import { WebtoonService } from '../services/webtoon.service';

@Injectable()
export class CreateWebtoonUseCase {
  constructor(private readonly webtoonService: WebtoonService) {}

  async execute(
    webtoonData: Omit<Webtoon, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Webtoon> {
    console.log(webtoonData);
    const newWebtoon = new Webtoon(webtoonData);
    return this.webtoonService.create(newWebtoon);
  }
}
