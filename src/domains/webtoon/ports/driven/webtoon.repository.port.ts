import { Webtoon } from '../../models/webtoon.model';

export abstract class WebtoonRepositoryPort {
  abstract findById(id: number): Promise<Webtoon | null>;
  abstract save(webtoon: Webtoon): Promise<Webtoon>;
  abstract update(id: number, webtoon: Partial<Webtoon>): Promise<Webtoon>;
  abstract delete(id: number): Promise<void>;
}
