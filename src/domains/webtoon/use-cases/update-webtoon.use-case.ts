import { Injectable } from '@nestjs/common';
import { WebtoonService } from '../services/webtoon.service';
import { Webtoon } from '../entities/webtoon.entity';
import { UpdateWebtoonPort } from '../ports/driving/update-webtoon.port';

@Injectable()
export class UpdateWebtoonUseCase implements UpdateWebtoonPort {
  constructor(private readonly webtoonService: WebtoonService) {}

  async execute(id: number, webtoon: Partial<Webtoon>): Promise<Webtoon> {
    return await this.webtoonService.update(id, webtoon);
  }
}
