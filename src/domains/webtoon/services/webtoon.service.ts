import { Injectable } from '@nestjs/common';
import { Webtoon } from '../entities/webtoon.entity';
import { WebtoonRepositoryPort } from '../ports/driven/webtoon.repository.port';

@Injectable()
export class WebtoonService {
  constructor(private readonly webtoonRepository: WebtoonRepositoryPort) {}

  async findById(id: number): Promise<Webtoon> {
    const webtoon = await this.webtoonRepository.findById(id);
    if (!webtoon) {
      throw new Error('웹툰을 찾을 수 없습니다.');
    }
    return webtoon;
  }

  async create(webtoon: Webtoon): Promise<Webtoon> {
    return this.webtoonRepository.save(webtoon);
  }

  async update(id: number, webtoon: Partial<Webtoon>): Promise<Webtoon> {
    return this.webtoonRepository.update(id, webtoon);
  }

  async delete(id: number): Promise<void> {
    await this.webtoonRepository.delete(id);
  }
}
