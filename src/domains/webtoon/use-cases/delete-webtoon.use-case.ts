import { Injectable } from '@nestjs/common';
import { WebtoonService } from '../services/webtoon.service';

@Injectable()
export class DeleteWebtoonUseCase {
  constructor(private readonly webtoonService: WebtoonService) {}

  async execute(id: number): Promise<void> {
    await this.webtoonService.delete(id);
  }
}
