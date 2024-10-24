import { Injectable } from '@nestjs/common';
import { Webtoon } from '../models/webtoon.model';
import { WebtoonService } from '../services/webtoon.service';
import { GetWebtoonPort } from '../ports/driving/get-webtoon.port';

@Injectable()
export class GetWebtoonUseCase implements GetWebtoonPort {
  constructor(private readonly webtoonService: WebtoonService) {}

  async execute(id: number): Promise<Webtoon> {
    return this.webtoonService.findById(id);
  }
}
