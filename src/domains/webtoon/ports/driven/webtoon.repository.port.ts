import { Webtoon } from '../../entities/webtoon.entity';

export interface WebtoonRepositoryPort {
  findById(id: number): Promise<Webtoon | null>;
  save(webtoon: Webtoon): Promise<Webtoon>;
  update(id: number, webtoon: Partial<Webtoon>): Promise<Webtoon>;
  delete(id: number): Promise<void>;
}
